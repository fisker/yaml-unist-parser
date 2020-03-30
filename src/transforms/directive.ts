import { createDirective } from "../factories/directive";
import { Context } from "../transform";
import { Directive } from "../types";
import { extractPropComments } from "../utils/extract-prop-comments";
import * as YAML from "../yaml";

export function transformDirective(
  directive: YAML.CST.Directive,
  context: Context,
): Directive {
  extractPropComments(directive, context);
  return createDirective(
    context.transformRange(directive.range!),
    directive.name,
    directive.parameters,
  );
}
