# Implementation Plan: Create Repair Parts Enhancement

## Overview

This implementation plan outlines the tasks required to enhance the Create Repair page's Parts section. The changes will update the UI to match the Edit Repair page styling and improve the parts selection functionality.

## Tasks

- [ ] 1. Update imports and icons in Create Repair page
  - Add Plus and Trash2 icons from lucide-react
  - Remove the "×" text button in favor of Trash2 icon
  - _Requirements: 2.2, 2.3_

- [ ] 2. Enhance the addPartFromDropdown function
  - [ ] 2.1 Update addPartFromDropdown to properly extract part data from selected option
    - Access `selectedPart.original.part_no` for part number
    - Access `selectedPart.original.description` for description
    - Add null check to prevent errors when selection is cleared
    - _Requirements: 1.2, 4.3_

  - [ ]* 2.2 Write property test for addPartFromDropdown function
    - **Property 1: Part Selection Populates Correct Data**
    - **Validates: Requirements 1.2, 4.3**

- [ ] 3. Update Parts Section UI to match Edit page
  - [ ] 3.1 Update Add Part button to use Plus icon
    - Replace text-only button with icon + text button
    - Match styling: `<Plus className="h-4 w-4 mr-2" />`
    - _Requirements: 2.2_

  - [ ] 3.2 Update Remove Part button to use Trash2 icon
    - Replace "×" text with Trash2 icon component
    - Add hover styling: `hover:text-red-700 hover:bg-red-50`
    - _Requirements: 2.3_

  - [ ] 3.3 Ensure parts row layout matches Edit page
    - Part No. input: `className="w-1/4"`
    - Description input: `className="flex-1"`
    - Quantity input: `className="w-24"` with `min="1"`
    - _Requirements: 2.4, 3.1, 3.2, 3.3_

- [ ] 4. Verify Parts Dropdown configuration
  - [ ] 4.1 Ensure partsList labels follow correct format
    - Format: `${p.part_no} - ${p.description}`
    - Verify isSearchable and isClearable props are set
    - _Requirements: 4.1, 4.2, 4.4_

  - [ ]* 4.2 Write property test for parts dropdown label format
    - **Property 2: Parts Dropdown Label Format**
    - **Validates: Requirements 4.2**

- [ ] 5. Checkpoint - Verify UI consistency
  - Ensure all tests pass, ask the user if questions arise.
  - Visually compare Create Repair page Parts section with Edit Repair page

- [ ]* 6. Write unit tests for Parts section
  - Test empty state displays "No parts added." message
  - Test Add Part button adds empty row
  - Test Remove Part button removes correct part
  - Test input field placeholders
  - _Requirements: 3.5, 1.4_

- [ ] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation primarily involves UI updates to the existing Create Repair page
- No backend changes are required as the data model remains the same
