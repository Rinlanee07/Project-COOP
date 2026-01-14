/**
 * Performance Monitoring and Reporting System
 * Provides comprehensive performance tracking and analysis for theme/language operations
 */

import { performanceUtils } from './preference-utils';

export interface PerformanceReport {
  operationName: string;
  metrics: {
    avg: number;
    min: number;
    max: number;
    count: number;
  };
  status: 'good' | 'warning' | 'critical';
  recommendations?: string[];
}

export interface PerformanceThresholds {
  good: number;
  warning: number;
  critical: number;
}

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private thresholds: Map<string, PerformanceThresholds> = new Map();
  private reportCallbacks: Set<(report: PerformanceReport) => void> = new Set();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    this.initializeDefaultThresholds();
  }

  /**
   * Initialize default performance thresholds
   */
  private initializeDefaultThresholds(): void {
    // Theme operations should be very fast
    this.setThreshold('theme-change', { good: 50, warning: 100, critical: 200 });
    this.setThreshold('theme-init', { good: 100, warning: 200, critical: 500 });
    this.setThreshold('global-theme-update', { good: 75, warning: 150, critical: 300 });
    
    // Language operations can be slightly slower due to translation loading
    this.setThreshold('saveLanguage', { good: 100, warning: 200, critical: 500 });
    this.setThreshold('loadLanguage', { good: 50, warning: 100, critical: 200 });
    this.setThreshold('global-language-update', { good: 150, warning: 300, critical: 600 });
    
    // Translation operations
    this.setThreshold('translation-sync', { good: 5, warning: 10, critical: 25 });
    this.setThreshold('translation-async', { good: 50, warning: 100, critical: 200 });
    this.setThreshold('load-chunk', { good: 20, warning: 50, critical: 100 });
    this.setThreshold('preload-chunks', { good: 100, warning: 200, critical: 500 });
    
    // Global state operations
    this.setThreshold('global-state-init', { good: 200, warning: 500, critical: 1000 });
    
    // CSS operations
    this.setThreshold('css-property-set', { good: 1, warning: 5, critical: 10 });
    this.setThreshold('apply-theme-variables', { good: 10, warning: 25, critical: 50 });
    this.setThreshold('batch-css-update', { good: 5, warning: 15, critical: 30 });
  }

  /**
   * Set performance threshold for an operation
   */
  setThreshold(operationName: string, thresholds: PerformanceThresholds): void {
    this.thresholds.set(operationName, thresholds);
  }

  /**
   * Get performance threshold for an operation
   */
  getThreshold(operationName: string): PerformanceThresholds | null {
    return this.thresholds.get(operationName) || null;
  }

  /**
   * Generate performance report for a specific operation
   */
  generateReport(operationName: string): PerformanceReport | null {
    const metrics = performanceUtils.getMetrics(operationName);
    if (!metrics) {
      return null;
    }

    const thresholds = this.getThreshold(operationName);
    if (!thresholds) {
      return {
        operationName,
        metrics,
        status: 'good'
      };
    }

    let status: 'good' | 'warning' | 'critical';
    const recommendations: string[] = [];

    if (metrics.avg <= thresholds.good) {
      status = 'good';
    } else if (metrics.avg <= thresholds.warning) {
      status = 'warning';
      recommendations.push(`Average response time (${metrics.avg.toFixed(2)}ms) is above optimal threshold (${thresholds.good}ms)`);
      
      if (metrics.max > thresholds.critical) {
        recommendations.push(`Maximum response time (${metrics.max.toFixed(2)}ms) indicates performance spikes`);
      }
    } else {
      status = 'critical';
      recommendations.push(`Average response time (${metrics.avg.toFixed(2)}ms) is critically slow (threshold: ${thresholds.warning}ms)`);
      recommendations.push('Consider optimizing this operation or investigating performance bottlenecks');
      
      if (operationName.includes('theme') || operationName.includes('language')) {
        recommendations.push('Check for excessive re-renders or unnecessary state updates');
      }
      
      if (operationName.includes('translation')) {
        recommendations.push('Consider preloading translation chunks or optimizing dictionary structure');
      }
    }

    const report: PerformanceReport = {
      operationName,
      metrics,
      status,
      recommendations: recommendations.length > 0 ? recommendations : undefined
    };

    // Notify callbacks
    this.reportCallbacks.forEach(callback => {
      try {
        callback(report);
      } catch (error) {
        console.error('Error in performance report callback:', error);
      }
    });

    return report;
  }

  /**
   * Generate comprehensive performance report for all operations
   */
  generateComprehensiveReport(): PerformanceReport[] {
    const allMetrics = performanceUtils.getAllMetrics();
    const reports: PerformanceReport[] = [];

    for (const operationName of Object.keys(allMetrics)) {
      const report = this.generateReport(operationName);
      if (report) {
        reports.push(report);
      }
    }

    // Sort by status (critical first, then warning, then good)
    reports.sort((a, b) => {
      const statusOrder = { critical: 0, warning: 1, good: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    return reports;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    totalOperations: number;
    goodOperations: number;
    warningOperations: number;
    criticalOperations: number;
    overallStatus: 'good' | 'warning' | 'critical';
  } {
    const reports = this.generateComprehensiveReport();
    
    const summary = {
      totalOperations: reports.length,
      goodOperations: reports.filter(r => r.status === 'good').length,
      warningOperations: reports.filter(r => r.status === 'warning').length,
      criticalOperations: reports.filter(r => r.status === 'critical').length,
      overallStatus: 'good' as 'good' | 'warning' | 'critical'
    };

    // Determine overall status
    if (summary.criticalOperations > 0) {
      summary.overallStatus = 'critical';
    } else if (summary.warningOperations > 0) {
      summary.overallStatus = 'warning';
    }

    return summary;
  }

  /**
   * Subscribe to performance reports
   */
  onReport(callback: (report: PerformanceReport) => void): () => void {
    this.reportCallbacks.add(callback);
    
    return () => {
      this.reportCallbacks.delete(callback);
    };
  }

  /**
   * Clear all performance data
   */
  clearData(): void {
    performanceUtils.clearMetrics();
  }

  /**
   * Export performance data for analysis
   */
  exportData(): {
    timestamp: number;
    metrics: Record<string, { avg: number; min: number; max: number; count: number }>;
    reports: PerformanceReport[];
    summary: {
      totalOperations: number;
      goodOperations: number;
      warningOperations: number;
      criticalOperations: number;
      overallStatus: 'good' | 'warning' | 'critical';
    };
  } {
    return {
      timestamp: Date.now(),
      metrics: performanceUtils.getAllMetrics(),
      reports: this.generateComprehensiveReport(),
      summary: this.getPerformanceSummary()
    };
  }

  /**
   * Log performance report to console (for development)
   */
  logReport(operationName?: string): void {
    if (operationName) {
      const report = this.generateReport(operationName);
      if (report) {
        this.logSingleReport(report);
      } else {
        console.log(`No performance data available for operation: ${operationName}`);
      }
    } else {
      const reports = this.generateComprehensiveReport();
      const summary = this.getPerformanceSummary();
      
      console.group('🚀 Performance Report');
      console.log(`Overall Status: ${this.getStatusEmoji(summary.overallStatus)} ${summary.overallStatus.toUpperCase()}`);
      console.log(`Total Operations: ${summary.totalOperations}`);
      console.log(`Good: ${summary.goodOperations}, Warning: ${summary.warningOperations}, Critical: ${summary.criticalOperations}`);
      
      if (reports.length > 0) {
        console.group('📊 Operation Details');
        reports.forEach(report => this.logSingleReport(report));
        console.groupEnd();
      }
      
      console.groupEnd();
    }
  }

  /**
   * Log a single performance report
   */
  private logSingleReport(report: PerformanceReport): void {
    const emoji = this.getStatusEmoji(report.status);
    console.group(`${emoji} ${report.operationName} (${report.status.toUpperCase()})`);
    console.log(`Average: ${report.metrics.avg.toFixed(2)}ms`);
    console.log(`Min: ${report.metrics.min.toFixed(2)}ms, Max: ${report.metrics.max.toFixed(2)}ms`);
    console.log(`Count: ${report.metrics.count} operations`);
    
    if (report.recommendations && report.recommendations.length > 0) {
      console.group('💡 Recommendations');
      report.recommendations.forEach(rec => console.log(`• ${rec}`));
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  /**
   * Get emoji for status
   */
  private getStatusEmoji(status: 'good' | 'warning' | 'critical'): string {
    switch (status) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  }
}

/**
 * Convenience functions for performance monitoring
 */
export const performanceMonitor = {
  getInstance: () => PerformanceMonitor.getInstance(),
  
  report: (operationName?: string) => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.logReport(operationName);
  },
  
  summary: () => {
    const monitor = PerformanceMonitor.getInstance();
    return monitor.getPerformanceSummary();
  },
  
  export: () => {
    const monitor = PerformanceMonitor.getInstance();
    return monitor.exportData();
  },
  
  clear: () => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.clearData();
  },
  
  setThreshold: (operationName: string, thresholds: PerformanceThresholds) => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.setThreshold(operationName, thresholds);
  }
};

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor() {
  const [summary, setSummary] = React.useState(() => {
    const monitor = PerformanceMonitor.getInstance();
    return monitor.getPerformanceSummary();
  });

  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    
    // Update summary when new reports are generated
    const unsubscribe = monitor.onReport(() => {
      setSummary(monitor.getPerformanceSummary());
    });

    return unsubscribe;
  }, []);

  const generateReport = React.useCallback((operationName?: string) => {
    const monitor = PerformanceMonitor.getInstance();
    return operationName 
      ? monitor.generateReport(operationName)
      : monitor.generateComprehensiveReport();
  }, []);

  const exportData = React.useCallback(() => {
    const monitor = PerformanceMonitor.getInstance();
    return monitor.exportData();
  }, []);

  const clearData = React.useCallback(() => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.clearData();
    setSummary(monitor.getPerformanceSummary());
  }, []);

  return {
    summary,
    generateReport,
    exportData,
    clearData
  };
}

// Add React import for the hook
import * as React from 'react';