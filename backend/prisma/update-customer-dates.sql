-- Update existing customers without created_at/updated_at
UPDATE "Customer" 
SET 
  created_at = COALESCE(created_at, NOW()),
  updated_at = COALESCE(updated_at, NOW())
WHERE created_at IS NULL OR updated_at IS NULL;
