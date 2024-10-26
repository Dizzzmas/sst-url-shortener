import { init } from "@paralleldrive/cuid2";
import { Resource } from "sst";
import { ZodSchema, z } from "zod";

let shortIdLength: number
try {
  const { Resource } = await import("sst");
  shortIdLength = parseInt(Resource.UrlShortenerShortIdLength.value);
} catch {
  shortIdLength = 8
}

export function fn<
  Arg1 extends ZodSchema,
  Callback extends (arg1: z.output<Arg1>) => any,
>(arg1: Arg1, cb: Callback) {
  const result = function (input: z.input<typeof arg1>): ReturnType<Callback> {
    const parsed = arg1.parse(input);
    return cb.apply(cb, [parsed as any]);
  };
  result.schema = arg1;
  return result;
}

export const createShortId = init({
  length: parseInt(Resource.UrlShortenerShortIdLength.value),
});

