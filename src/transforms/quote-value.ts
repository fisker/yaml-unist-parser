import { createQuoteValue } from "../factories/quote-value";
import { Context } from "../transform";
import { QuoteValue } from "../types";
import * as YAML from "../yaml";

export function transformAstQuoteValue(
  quoteValue: YAML.AST.QuoteDouble | YAML.AST.QuoteSingle,
  context: Context,
): QuoteValue {
  const cstNode = quoteValue.cstNode!;
  return createQuoteValue(
    context.transformRange(cstNode.valueRange!),
    context.transformContent(quoteValue),
    cstNode.strValue as string,
  );
}
