import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

export interface HealthResponse {
  readonly status: "ok";
  readonly service: "saligan-api";
  readonly version: "0.1.0";
}

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check API health" })
  @ApiOkResponse({ description: "API is available" })
  getHealth(): HealthResponse {
    return {
      status: "ok",
      service: "saligan-api",
      version: "0.1.0",
    };
  }
}
