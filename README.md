# Stackfix Live Challenge

A modern product comparison platform built with the T3 Stack, featuring advanced filtering, searching, and multiple view options.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) - React framework for production
- **Database**: PostgreSQL - Chosen for:
  - Complex querying capabilities needed for product comparisons
  - Strong data relationships (products, requirements, pricing)
  - Robust full-text search features
  - Transaction support for data integrity
- **ORM**: [Prisma](https://prisma.io) - Type-safe database access
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **UI Components**: [Shadcn](https://ui.shadcn.com) - Accessible component system
- **API Layer**: [tRPC](https://trpc.io) - End-to-end type-safe APIs

## Core Features

### 1. Product Views

- **Card View**:

  - Visual product comparison
  - Quick access to key metrics
  - Expandable details section
  - Real-time fit score calculation

- **Table View**:
  - Sortable columns
  - Server-side pagination
  - Advanced filtering
  - Efficient data loading

### 2. Common Components

#### ClassicTable

A reusable table component with:

- Generic type support (`<T>`)
- Server-side pagination (10 items per page)
- Client-side sorting
- Search functionality
- Responsive design
- TypeScript support
- Custom column definitions

```typescript
interface Column<T> {
  header: string;
  accessor: ((item: T) => string | number) | keyof T;
  sortable?: boolean;
}
```

### 3. Search Implementation

- Server-side search with Postgres
- Debounced search input
- Case-insensitive matching
- Multiple field search support
- Real-time results

### 4. Product Comparison

- Side-by-side comparison
- Requirement matching
- Fit score calculation
- Price comparison
- Feature matrix

### 5. Database Schema

```prisma
model Product {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  logoUrl       String?
  stackfixScore Float
  fitScore      Float
  dealBreakers  String[]
  totalPrice    Float
  pricingPeriod String
  requirements  ProductRequirement[]
  // ... other fields
}

model ProductRequirement {
  id        String   @id @default(cuid())
  name      String
  status    String
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  // ... other fields
}
```

## Performance Optimizations

1. **Pagination**

   - Server-side pagination to handle large datasets
   - Keeps initial load fast
   - Reduces memory usage

2. **Search**

   - Debounced queries
   - Indexed database columns
   - Optimized SQL queries

3. **Caching**
   - Static page generation where possible
   - Client-side data caching
   - Stale-while-revalidate strategy

## Running Locally

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev

# Build for production
pnpm run build
```

## Environment Variables

```env
DATABASE_URL="postgresql://..."
USE_API_DATA="false"
```

## Future Improvements

1. Add sorting at database level
2. Implement advanced filtering
3. Add export functionality
4. Enhance search with fuzzy matching
5. Add user authentication
6. Implement favorite products
7. Add comparison history

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
