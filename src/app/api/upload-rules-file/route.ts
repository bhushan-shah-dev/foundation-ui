import type { RulesEncoding } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const file = (await request.formData()).get("rulesFile") as File;
  console.info(`Reading rules file ${file?.name}`);

  // FIXME: do something with the file to calculate the response
  // response mocked for now

  const response: RulesEncoding = {
    "Section 1": {
      plaintext: "Section 1 text",
      code: 'print "Section 1"',
    },
    "Section 2": {
      plaintext: "Section 2 text",
      code: 'print "Section 2"',
    },
  };

  return NextResponse.json(response);
}
