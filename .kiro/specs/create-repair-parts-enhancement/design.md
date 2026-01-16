# Design Document: Create Repair Parts Enhancement

## Overview

This design document outlines the implementation approach for enhancing the Create Repair page's Parts section. The enhancement focuses on improving the user experience by auto-populating part information when selected from a dropdown and aligning the Create Repair page's styling with the Edit Repair page for consistency.

## Architecture

The enhancement follows the existing React component architecture used in the application:

```
Create Repair Page (page.tsx)
├── Form State Management (useState hooks)
├── Parts Section Card
│   ├── Parts Dropdown (react-select)
│   ├── Add Part Button (with Plus icon)
│   └── Parts List
│       └── Part Row (Part No., Description, Quantity, Remove Button)
└── Form Submission Handler
```

The implementation will modify the existing `CreateRepair` component to:
1. Update the Parts section UI to match the Edit page
2. Enhance the `addPartFromDropdown` function to properly populate fields
3. Update button icons to use Lucide React icons (Plus, Trash2)

## Components and Interfaces

### Modified Component: CreateRepair

The existing `CreateRepair` component will be updated with the following changes:

```typescript
// Import additional icons from lucide-react
import { Loader2, Plus, Trash2 } from "lucide-react";

// Parts state (existing)
const [parts, setParts] = useState<Array<{ 
  part_number: string; 
  description: string; 
  quantity: number 
}>>([]);

// Enhanced addPartFromDropdown function
const addPartFromDropdown = (selectedPart: any) => {
  if (!selectedPart) return;
  const newPart = {
    part_number: selectedPart.original.part_no,
    description: selectedPart.original.description,
    quantity: 1
  };
  setParts([...parts, newPart]);
};

// Part management functions (existing)
const addPart = () => {
  setParts([...parts, { part_number: "", description: "", quantity: 1 }]);
};

const removePart = (index: number) => {
  setParts(parts.filter((_, i) => i !== index));
};

const updatePart = (index: number, field: keyof typeof parts[0], value: string | number) => {
  const newParts = [...parts];
  newParts[index] = { ...newParts[index], [field]: value };
  setParts(newParts);
};
```

### Parts Section UI Structure

```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Parts</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Parts Dropdown */}
    <div className="space-y-2">
      <Label>อุปกรณ์</Label>
      <Select
        options={partsList}
        onChange={addPartFromDropdown}
        placeholder="เลือกอุปกรณ์"
        isSearchable
        isClearable
      />
    </div>

    {/* Header with Add Button */}
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">PART NO., DESCRIPTION, QUANTITY</p>
      <Button type="button" variant="outline" size="sm" onClick={addPart}>
        <Plus className="h-4 w-4 mr-2" />
        Add Part
      </Button>
    </div>

    {/* Empty State */}
    {parts.length === 0 && (
      <p className="text-sm text-gray-400 italic">No parts added.</p>
    )}

    {/* Parts List */}
    {parts.map((part, index) => (
      <div key={index} className="flex gap-2 items-start">
        <Input
          placeholder="Part No."
          value={part.part_number}
          onChange={(e) => updatePart(index, "part_number", e.target.value)}
          className="w-1/4"
        />
        <Input
          placeholder="Description"
          value={part.description}
          onChange={(e) => updatePart(index, "description", e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={part.quantity}
          onChange={(e) => updatePart(index, "quantity", parseInt(e.target.value) || 1)}
          className="w-24"
          min="1"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removePart(index)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </CardContent>
</Card>
```

## Data Models

### Part Interface

```typescript
interface Part {
  part_number: string;  // PART NO. field
  description: string;  // DESCRIPTION field
  quantity: number;     // QUANTITY field (minimum 1)
}
```

### Parts List Option Interface (for react-select)

```typescript
interface PartOption {
  value: string | number;  // Part ID from database
  label: string;           // Display format: "{part_no} - {description}"
  original: {
    id: number;
    part_no: string;
    description: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Part Selection Populates Correct Data

*For any* part selected from the Parts_Dropdown, the newly added part row SHALL contain the exact `part_no` as PART NO. and the exact `description` as DESCRIPTION from the selected part's original data.

**Validates: Requirements 1.2, 4.3**

### Property 2: Parts Dropdown Label Format

*For any* part in the partsList, the label SHALL be formatted as `"{part_no} - {description}"` where `part_no` and `description` are the corresponding values from the part's original data.

**Validates: Requirements 4.2**

## Error Handling

### Input Validation

1. **Empty Part Selection**: If `selectedPart` is null or undefined in `addPartFromDropdown`, the function returns early without adding a part
2. **Invalid Quantity**: Quantity input uses `parseInt` with fallback to 1 if parsing fails
3. **Minimum Quantity**: Input field has `min="1"` attribute to prevent zero or negative quantities

### Edge Cases

1. **No Parts in Database**: If `partsList` is empty, the dropdown shows no options but manual entry is still available
2. **Duplicate Parts**: Users can add the same part multiple times (each as a separate row)
3. **Empty Fields**: Parts with empty `part_number` or `description` are allowed for manual entry flexibility

## Testing Strategy

### Unit Tests

Unit tests will verify specific UI behaviors and edge cases:

1. **Empty State Display**: Verify "No parts added." message appears when parts array is empty
2. **Add Part Button**: Verify clicking Add Part adds an empty part row
3. **Remove Part Button**: Verify clicking remove button removes the correct part
4. **Input Field Placeholders**: Verify correct placeholder text for each field
5. **Quantity Minimum**: Verify quantity input has min="1" attribute

### Property-Based Tests

Property-based tests will use a testing library (e.g., fast-check) to verify universal properties:

1. **Property 1**: For all valid part objects, `addPartFromDropdown` should add a part with matching `part_number` and `description`
2. **Property 2**: For all parts in the database, the dropdown label should follow the format `"{part_no} - {description}"`

**Test Configuration**:
- Minimum 100 iterations per property test
- Tag format: **Feature: create-repair-parts-enhancement, Property {number}: {property_text}**
