export type RuleEncoding = {
  sectionName: string;
  plaintext: string;
  code: string;
  additionalInfo?: string;
};

export type RulesEncoding = Array<RuleEncoding>;
