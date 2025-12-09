import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOperationOptions } from "@nestjs/swagger";
import { Public } from "@/auth/public.decorator";

/**
 * Decorator for public API endpoints that don't require authentication.
 * Combines @Public() with Swagger documentation indicating no auth required.
 *
 * @param operationOptions - Swagger API operation options (summary, description, etc.)
 */
export function PublicRoute(operationOptions?: ApiOperationOptions) {
  const summary = operationOptions?.summary
    ? `${operationOptions.summary} (Public - No auth required)`
    : "Public endpoint - No auth required";

  return applyDecorators(
    Public(),
    ApiOperation({
      ...operationOptions,
      summary,
      security: [],
    }),
  );
}
