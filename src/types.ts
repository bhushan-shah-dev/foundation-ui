export type RuleEncoding = {
  plaintext: string;
  code: string;
  additionalInfo?: string;
};

export type RuleType = "Section 1" | "Section 2";

export type RulesEncoding = Record<RuleType, RuleEncoding>;
