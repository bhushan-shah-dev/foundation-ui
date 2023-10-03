import { RulesResult } from "@/types";
import {
  Button,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";
import styles from "./display-rules-result.module.scss";

type DisplayRulesResultProps = {
  rulesResult: RulesResult;
};

const DisplayRulesResult: FC<DisplayRulesResultProps> = function ({
  rulesResult: { resultSummary, resultDetails },
}) {
  const summaryItems: [string, number][] = Object.entries(resultSummary).map(
    function ([key, value]) {
      return [key, value];
    }
  );

  const detailsKeys: string[] = Object.keys(resultDetails[0]);

  const columnHelper = createColumnHelper<Record<string, string>>();

  const columns = detailsKeys.map(function (key) {
    return columnHelper.accessor(key, {
      cell: function (info) {
        return info.getValue();
      },
    });
  });

  const detailsTable = useReactTable<RulesResult["resultDetails"][0]>({
    columns,
    data: resultDetails,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles["main-container"]}>
      <TableContainer>
        <Table variant={"simple"} size={"sm"}>
          <TableCaption placement="top">Result Summary</TableCaption>
          <Thead>
            <Tr>
              <Th>Variable</Th>
              <Th>Values</Th>
            </Tr>
          </Thead>
          <Tbody>
            {summaryItems.map(function ([variable, value]) {
              return (
                <Tr key={variable}>
                  <Td>{variable}</Td>
                  <Td>{value}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer className={styles["details-table-container"]}>
        <Table variant={"simple"} size={"md"}>
          <TableCaption placement="top">Result Details</TableCaption>
          <Thead>
            {detailsTable.getHeaderGroups().map(function (headerGroup, i) {
              return (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(function (header) {
                    return (
                      <Th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody>
            {detailsTable.getRowModel().rows.map(function (row) {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(function (cell) {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <div className={styles["pagination-controls-container"]}>
          <Button
            size="xs"
            variant="outline"
            onClick={() => detailsTable.setPageIndex(0)}
            disabled={!detailsTable.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => detailsTable.previousPage()}
            disabled={!detailsTable.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() => detailsTable.nextPage()}
            disabled={!detailsTable.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() =>
              detailsTable.setPageIndex(detailsTable.getPageCount() - 1)
            }
            disabled={!detailsTable.getCanNextPage()}
          >
            {">>"}
          </Button>
          <span>
            <div>Page</div>
            <strong>
              {detailsTable.getState().pagination.pageIndex + 1} of{" "}
              {detailsTable.getPageCount()}
            </strong>
          </span>
          <span>
            |{" "}
            <label>
              Go to page:{" "}
              <Input
                width={"30px"}
                size="xs"
                variant="filled"
                type="number"
                defaultValue={detailsTable.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  detailsTable.setPageIndex(page);
                }}
              />
            </label>
          </span>
        </div>
      </TableContainer>
    </div>
  );
};

export default DisplayRulesResult;
