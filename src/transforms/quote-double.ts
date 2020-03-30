import { createQuoteDouble } from "../factories/quote-double";
import { Context } from "../transform";
import { QuoteDouble } from "../types";
import * as YAML from "../yaml";
import { transformAstQuoteValue } from "./quote-value";

export function transformQuoteDouble(
  quoteDouble: YAML.AST.QuoteDouble,
  context: Context,
): QuoteDouble {
  return createQuoteDouble(transformAstQuoteValue(quoteDouble, context));
}
