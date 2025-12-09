import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  roles: string[];
}

export const CurrentUser = createParamDecorator((data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as JwtPayload;

  if (!user) {
    return null;
  }

  return data ? user[data] : user;
});
