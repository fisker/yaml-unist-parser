import LinesAndColumns from "lines-and-columns";
import { transformAlias } from "./transforms/alias";
import { transformBlockFolded } from "./transforms/block-folded";
import { transformBlockLiteral } from "./transforms/block-literal";
import { transformComment } from "./transforms/comment";
import { transformDirective } from "./transforms/directive";
import { transformDocument } from "./transforms/document";
import { transformFlowMap } from "./transforms/flow-map";
import { transformFlowSeq } from "./transforms/flow-seq";
import { transformMap } from "./transforms/map";
import { transformPlain } from "./transforms/plain";
import { transformQuoteDouble } from "./transforms/quote-double";
import { transformQuoteSingle } from "./transforms/quote-single";
import { Range } from "./transforms/range";
import { transformSeq } from "./transforms/seq";
import {
  Alias,
  BlockFolded,
  BlockLiteral,
  Comment,
  Content,
  Directive,
  Document,
  FlowMapping,
  FlowSequence,
  Mapping,
  Plain,
  Point,
  Position,
  QuoteDouble,
  QuoteSingle,
  Sequence,
  YamlUnistNode,
} from "./types";
import * as YAML from "./yaml";

export type YamlNode =
  | null
  | YAML.AST.Alias
  | YAML.CST.BlankLine
  | YAML.AST.BlockFolded
  | YAML.AST.BlockLiteral
  | YAML.CST.Comment
  | YAML.CST.Directive
  | YAML.Document
  | YAML.AST.FlowMap
  | YAML.AST.FlowSeq
  | YAML.AST.BlockMap
  | YAML.AST.PlainValue
  | YAML.AST.QuoteDouble
  | YAML.AST.QuoteSingle
  | YAML.AST.BlockSeq;

// prettier-ignore
export type YamlToUnist<T extends YamlNode> =
  T extends null ? null :
  T extends YAML.AST.Alias ? Alias :
  T extends YAML.AST.BlockFolded ? BlockFolded :
  T extends YAML.AST.BlockLiteral ? BlockLiteral :
  T extends YAML.CST.Comment ? Comment :
  T extends YAML.CST.Directive ? Directive :
  T extends YAML.Document ? Document :
  T extends YAML.AST.FlowMap ? FlowMapping :
  T extends YAML.AST.FlowSeq ? FlowSequence :
  T extends YAML.AST.BlockMap ? Mapping :
  T extends YAML.AST.PlainValue ? Plain :
  T extends YAML.AST.QuoteDouble ? QuoteDouble :
  T extends YAML.AST.QuoteSingle ? QuoteSingle :
  T extends YAML.AST.BlockSeq ? Sequence :
  never;

export interface Context {
  text: string;
  locator: LinesAndColumns;
  comments: Comment[];
  transformOffset: (offset: number) => Point;
  transformRange: (range: Range) => Position;
  transformNode: <T extends YamlNode>(node: T) => YamlToUnist<T>;
  transformContent: (node: YAML.AST.Node) => Content;
}

export function transformNode<T extends YamlNode>(
  node: T,
  context: Context,
): YamlToUnist<T>;
export function transformNode(
  node: YamlNode,
  context: Context,
): YamlUnistNode | null {
  if (node === null) {
    return null;
  }

  // prettier-ignore
  switch (node.type) {
    case "ALIAS": return transformAlias(node, context);
    case "BLOCK_FOLDED": return transformBlockFolded(node as YAML.AST.BlockFolded, context);
    case "BLOCK_LITERAL": return transformBlockLiteral(node as YAML.AST.BlockLiteral, context);
    case "COMMENT": return transformComment(node, context);
    case "DIRECTIVE": return transformDirective(node, context);
    case "DOCUMENT": return transformDocument(node, context);
    case "FLOW_MAP": return transformFlowMap(node, context);
    case "FLOW_SEQ": return transformFlowSeq(node, context);
    case "MAP": return transformMap(node, context);
    case "PLAIN": return transformPlain(node as YAML.AST.PlainValue, context);
    case "QUOTE_DOUBLE": return transformQuoteDouble(node as YAML.AST.QuoteDouble, context);
    case "QUOTE_SINGLE": return transformQuoteSingle(node as YAML.AST.QuoteSingle, context);
    case "SEQ": return transformSeq(node, context);
    // istanbul ignore next
    default: throw new Error(`Unexpected node type ${node.type}`);
  }
}
