"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Printer, Download, ArrowLeft } from 'lucide-react';
import { repairService, type RepairDetail } from '@/services/repairService';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RepairDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // repair request ID

  const [repairDetail, setRepairDetail] = useState<RepairDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add print styles
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-content, #print-content * {
          visibility: visible;
        }
        #print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 210mm !important;
          min-height: 297mm !important;
          padding: 12mm !important;
          margin: 0 !important;
          font-size: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) {
        console.error('[RepairDetail] No ID provided');
        setError('ไม่พบ ID ของงานซ่อม');
        setLoading(false);
        return;
      }

      // Check token first
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('[RepairDetail] No token found, redirecting to login');
          setError('กรุณาเข้าสู่ระบบอีกครั้ง');
          setLoading(false);
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }
      }

      try {
        console.log('[RepairDetail] Fetching repair detail for ID:', id);
        const res = await repairService.getById(Number(id));
        console.log('[RepairDetail] Response:', res);
        
        if (res.success && res.data) {
          setRepairDetail(res.data);
          console.log('[RepairDetail] Repair detail loaded:', res.data);
        } else {
          console.warn('[RepairDetail] Repair not found or error:', res.error);
          const errorMsg = res.error || 'ไม่พบข้อมูลงานซ่อม';
          setError(errorMsg);
          
          // If unauthorized, redirect to login
          if (errorMsg.includes('Unauthorized') || errorMsg.includes('กรุณาเข้าสู่ระบบ')) {
            setTimeout(() => {
              router.push('/');
            }, 2000);
          }
        }
      } catch (err) {
        console.error('[RepairDetail] Fetch error:', err);
        setError('เกิดข้อผิดพลาดขณะดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleExportPDF = async () => {
    if (!printRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const element = printRef.current;
      
      // Convert element to canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Calculate dimensions to fit A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate ratio to fit A4 page (maintain aspect ratio)
      const imgWidthInMm = (imgWidth / 2) * 0.264583;
      const imgHeightInMm = (imgHeight / 2) * 0.264583;
      
      const widthRatio = pdfWidth / imgWidthInMm;
      const heightRatio = pdfHeight / imgHeightInMm;
      const ratio = Math.min(widthRatio, heightRatio);
      
      // Final dimensions
      const finalWidth = imgWidthInMm * ratio;
      const finalHeight = imgHeightInMm * ratio;
      
      // Center horizontally
      const imgX = (pdfWidth - finalWidth) / 2;
      
      // If content fits in one page, add it directly
      if (finalHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', imgX, 0, finalWidth, finalHeight);
      } else {
        // Handle multiple pages
        let heightLeft = finalHeight;
        let position = 0;
        
        while (heightLeft > 0) {
          const pageHeight = Math.min(heightLeft, pdfHeight);
          
          // Calculate source position in pixels
          const sourceY = (position / finalHeight) * imgHeight;
          const sourceHeight = (pageHeight / finalHeight) * imgHeight;
          
          // Create a temporary canvas for this page slice
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = Math.ceil(sourceHeight);
          const ctx = pageCanvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              sourceY,
              imgWidth,
              sourceHeight,
              0,
              0,
              imgWidth,
              sourceHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(pageImgData, 'PNG', imgX, 0, finalWidth, pageHeight);
          }
          
          heightLeft -= pdfHeight;
          position += pdfHeight;
          
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }
      }
      
      const fileName = `repair-detail-${repairDetail?.repairRequest.id || id}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return '';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const formatDateShort = (dateString: string | Date | null | undefined) => {
    if (!dateString) return '';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#092A6D] mx-auto mb-4" />
          <p className="text-[#666666]">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <div className="bg-red-50 border-red-200 rounded-xl shadow-sm p-4 text-center text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!repairDetail || !repairDetail.repairRequest) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <div className="bg-white border border-[#E8EBF5] rounded-xl shadow-sm p-12 text-center text-[#666666]">
          ไม่พบข้อมูลงานซ่อม
        </div>
      </div>
    );
  }

  const { repairRequest, parts = [], technician, repairLogs = [] } = repairDetail;
  const totalCost = parts.reduce((sum: number, p: any) => sum + p.price * p.quantity, 0);

  // Company Information (สามารถดึงจาก settings หรือ hardcode)
  const companyInfo = {
    name: 'บริษัท เคล็กสเพิร์ท (ประเทศไทย) จำกัด',
    nameEn: 'CLEXPERT (THAILAND) CO., LTD.',
    address: '14 ซ.รัตนาธิเบศร์ 30 ถ.รัตนาธิเบศร์ ต.บางกระสอ อ.เมือง จ. นนทบุรี 11000',
    phone: '02-9699200-4',
    fax: '02-9699205',
    taxId: '0-1055-33083-35-8',
    docCode: 'FM-TEC-101',
  };

  // Get ticket data from repairDetail
  const latestRepairLog = repairLogs && repairLogs.length > 0 ? repairLogs[0] : null;
  const ticketData = {
    jobNo: repairRequest.ticketId || `RP${repairRequest.id.toString().padStart(8, '0')}`,
    receivingDate: repairRequest.createdAt,
    dueDate: repairRequest.updatedAt,
    sentBy: repairRequest.sentBy || '',
    receivedBy: repairRequest.receivedBy || '',
    faultDescription: repairRequest.description || '',
    accessories: repairRequest.accessories || '',
    remark: repairRequest.remark || '',
    engineerComment: repairRequest.engineerComment || '',
    repairDate: latestRepairLog?.repairDate || null,
    purchaseDate: repairRequest.purchaseDate || null,
    contractDate: null, // Not available in current schema
    isChargeable: repairRequest.isChargeable || false,
  };

  return (
    <div className="space-y-6 bg-[#F5F7FA] min-h-screen">
      {/* Action Buttons - Hidden when printing */}
      <div className="flex items-center justify-between print:hidden p-6 pb-0">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            พิมพ์
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 bg-[#092A6D] hover:bg-[#092A6D]/90 text-white"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                กำลังสร้าง PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                ส่งออก PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* A4 Printable Content - Repair Job Receipt Format */}
      <div
        ref={printRef}
        className="bg-white mx-auto print:m-0 print:shadow-none w-full max-w-5xl p-6 md:p-8 lg:p-12"
        style={{
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Company Header */}
        <div className="text-center mb-3 border-b-2 border-black pb-2">
          <h1 className="text-base font-bold mb-0.5">{companyInfo.name}</h1>
          <h2 className="text-sm font-semibold mb-1">{companyInfo.nameEn}</h2>
          <div className="text-[9px] space-y-0.5">
            <p>{companyInfo.address}</p>
            <p>
              <span className="font-semibold">โทรศัพท์:</span> {companyInfo.phone} {' '}
              <span className="font-semibold">แฟกซ์:</span> {companyInfo.fax}
            </p>
            <p>
              <span className="font-semibold">รหัสเอกสาร:</span> {companyInfo.docCode} {' '}
              <span className="font-semibold">เลขที่ประจำตัวผู้เสียภาษี:</span> {companyInfo.taxId}
            </p>
          </div>
          <p className="text-xs font-bold mt-1">เอกสารเครื่องซ่อม (REPAIR JOB RECEIPT)</p>
        </div>

        {/* Job Information */}
        <div className="grid grid-cols-2 gap-3 mb-2 text-[9px]">
          <div>
            <p><span className="font-semibold">วันที่รับซ่อม (RECEIVING DATE):</span> {formatDate(ticketData.receivingDate)}</p>
          </div>
          <div className="text-right">
            <p><span className="font-semibold">ใบรับซ่อมเลขที่ (JOB NO):</span> {ticketData.jobNo}</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">ข้อมูลลูกค้า (CUSTOMER INFORMATION)</h3>
          <div className="space-y-0.5">
            <p><span className="font-semibold">ชื่อบริษัท (CUSTOMER NAME):</span> {repairRequest.customer.name}</p>
            <p><span className="font-semibold">ที่อยู่ (ADDRESS):</span> {repairRequest.customer.address || '-'}</p>
            <p><span className="font-semibold">เลขประจำตัวผู้เสียภาษี (อากร):</span> {repairRequest.customer.taxId || '-'}</p>
            <p><span className="font-semibold">ชื่อบุคคลที่ติดต่อ (CONTACT PERSON):</span> {repairRequest.customer.contactPerson || '-'}</p>
            <p><span className="font-semibold">โทรศัพท์ (TEL):</span> {repairRequest.customer.phone || '-'}</p>
          </div>
        </div>

        {/* Product Information */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">ข้อมูลผลิตภัณฑ์ (PRODUCT INFORMATION)</h3>
          <div className="space-y-0.5">
            <p><span className="font-semibold">ชื่อผลิตภัณฑ์ (PRODUCT):</span> {repairRequest.printerModel}</p>
            <p><span className="font-semibold">หมายเลข (SERIAL NO.):</span> {repairRequest.serialNumber}</p>
            <p><span className="font-semibold">อาการเสีย (DESC OF FAULT):</span> {ticketData.faultDescription || '-'}</p>
            <p><span className="font-semibold">อุปกรณ์ที่นำมาด้วย (ACCESSORIES):</span> {ticketData.accessories || '-'}</p>
            <p><span className="font-semibold">หมายเหตุ (REMARK):</span> {ticketData.remark || '-'}</p>
          </div>
        </div>

        {/* Receive/Deliver Section */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">การรับ-ส่งสินค้า (RECEIVE/DELIVER)</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="mb-0.5"><span className="font-semibold">ลงชื่อผู้นำมาซ่อม (CUSTOMER):</span></p>
              <div className="border-b border-black h-6"></div>
            </div>
            <div>
              <p className="mb-0.5"><span className="font-semibold">ลงชื่อผู้รับเครื่องซ่อม (RECEIVE BY):</span></p>
              <div className="border-b border-black h-6"></div>
            </div>
            <div>
              <p className="mb-0.5"><span className="font-semibold">วันที่นัด (DUE DATE):</span></p>
              <div className="border-b border-black h-6"></div>
            </div>
          </div>
        </div>

        {/* Parts/Repair Details Table */}
        <div className="mb-2 text-[9px] border border-black">
          <h3 className="font-bold p-1.5 bg-gray-100 border-b border-black text-[10px]">รายละเอียดอะไหล่/การซ่อม (PARTS/REPAIR DETAILS)</h3>
          <table className="w-full border-collapse text-[9px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 text-left font-semibold">PART NO.</th>
                <th className="border border-black p-1 text-left font-semibold">DESCRIPTION</th>
                <th className="border border-black p-1 text-center font-semibold">QC PASSED</th>
                <th className="border border-black p-1 text-center font-semibold">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {parts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="border border-black p-1 text-center">ไม่มีอะไหล่ที่ใช้</td>
                </tr>
              ) : (
                parts.map((part: any, i: number) => (
                  <tr key={i}>
                    <td className="border border-black p-1">{part.partNumber || '-'}</td>
                    <td className="border border-black p-1">{part.partName}</td>
                    <td className="border border-black p-1 text-center">-</td>
                    <td className="border border-black p-1 text-center">{part.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Engineer Report */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">รายงานช่าง (ENGINEER REPORT)</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p><span className="font-semibold">ENGINEER:</span> {technician?.name || '-'}</p>
              <p className="mt-1"><span className="font-semibold">PURCHASE DATE:</span> {ticketData.purchaseDate ? formatDateShort(ticketData.purchaseDate) : '-'}</p>
            </div>
            <div>
              <p><span className="font-semibold">REPAIR DATE:</span> {ticketData.repairDate ? formatDateShort(ticketData.repairDate) : '-'}</p>
              <p className="mt-1"><span className="font-semibold">CONTRACT DATE:</span> {ticketData.contractDate ? formatDateShort(ticketData.contractDate) : '-'}</p>
            </div>
          </div>
          <div className="mt-1">
            <p className="font-semibold mb-0.5">COMMENT:</p>
            <div className="border border-black p-1.5 min-h-[40px]">{ticketData.engineerComment || '-'}</div>
          </div>
        </div>

        {/* Acknowledgement Section */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">ส่วนรับรอง (ACKNOWLEDGEMENT)</h3>
          <p className="mb-1.5 text-[8px]">
            ตรวจสอบการซ่อมสภาพทั่วไป อุปกรณ์และรับสินค้าที่นำมาซ่อมกลับคืนไปแล้ว จะไม่เรียกร้องสิทธิใดๆ อีก จึงลงลายมือไว้เป็นหลักฐาน
          </p>
          <p className="mb-1.5 text-[8px] italic">
            (I AS SAID BELOW TOOK MY BELONGING FROM SERVICE CENTER AS THE DATE MENTIONED.)
          </p>
            <div className="mb-1.5">
              <p className="font-semibold mb-0.5">สถานะการชำระเงิน:</p>
              <div className="flex gap-3">
                <label className="flex items-center gap-1">
                  <input type="radio" name="payment" value="free" checked={!ticketData.isChargeable} readOnly className="w-3 h-3" />
                  <span>({!ticketData.isChargeable ? '✓' : ' '}) Free</span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="payment" value="charge" checked={ticketData.isChargeable} readOnly className="w-3 h-3" />
                  <span>({ticketData.isChargeable ? '✓' : ' '}) Charge</span>
                </label>
              </div>
            </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="mb-0.5"><span className="font-semibold">ลงชื่อผู้รับเครื่อง (CUSTOMER):</span></p>
              <div className="border-b border-black h-7"></div>
              <p className="text-[8px] mt-0.5">(กรุณาเขียนตัวบรรจง)</p>
            </div>
            <div>
              <p className="mb-0.5"><span className="font-semibold">วันที่รับเครื่อง (DATE):</span></p>
              <div className="border-b border-black h-7"></div>
              <p className="text-[8px] mt-0.5">(วัน/เดือน/ปี)</p>
            </div>
          </div>
        </div>

        {/* Return Details */}
        <div className="mb-2 text-[9px] border border-black p-2">
          <h3 className="font-bold mb-1 text-[10px] underline">ส่วนการจ่ายเครื่องคืน (RETURN DETAILS)</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mb-0.5"><span className="font-semibold">ลงชื่อผู้จ่ายเครื่องคืน (OFFICER):</span></p>
              <div className="border-b border-black h-7"></div>
              <p className="text-[8px] mt-0.5">(กรุณาเขียนตัวบรรจง)</p>
            </div>
            <div>
              <p className="mb-0.5"><span className="font-semibold">วันที่จ่ายเครื่องคืน (DATE):</span></p>
              <div className="border-b border-black h-7"></div>
              <p className="text-[8px] mt-0.5">(วัน/เดือน/ปี)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[8px] mt-2 pt-1 border-t border-black">
          <p>R06(15/02/2559)</p>
        </div>
      </div>
    </div>
  );
};

export default RepairDetailsPage;
