// #region encode-rules-data

// Request:
// multipart form data:
// rulesFile: rules.html

// Response: RulesData

// #endregion

// #region column-schema-mapping

// Request:
// multipart form data:
// schemaFiles: [p1.csv, p2.csv...]
// variables: RulesData

// Response: SchemaMappingData

// #endregion

// #region value-schema-mapping

// Request: SchemaMappingData

// Response: ValueSchemaMapping

// #endregion

export type RuleEncoding = {
  sectionName: string;
  plaintext: string;
  code: string;
  additionalInfo?: string;
};

export type RulesEncoding = Array<RuleEncoding>;

export type VariableMap = Record<string, string[]>;

export type RulesData = {
  rulesEncoding: RulesEncoding;
  variableMap: VariableMap;
};

export type PatientRecordsSchema = {
  root: Record<string, Record<string, string[]>[]>;
};

export type ColumnSchemaMapping = Record<string, Record<string, string>>;

export type SchemaMappingData = {
  variableMap: VariableMap;
  patientRecordsSchema: PatientRecordsSchema;
  columnSchemaMapping: ColumnSchemaMapping;
};

export type ValueSchemaMapping = Record<
  string,
  Record<string, Record<string, string[]>>
>;

export type RulesResultSummary = Record<string, number>;
export type RulesResultDetails = Record<string, string>[];

export type RulesResult = {
  resultSummary: RulesResultSummary;
  resultDetails: RulesResultDetails;
};
