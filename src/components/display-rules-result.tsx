import { RulesResult } from "@/types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Heading,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Download } from "@mui/icons-material";
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
      <TableContainer className={styles["table-container"]}>
        <Heading size="sm">Result Summary</Heading>
        <Table variant="simple" size={"sm"}>
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
      <TableContainer
        className={`${styles["table-container"]} ${styles["details-table-container"]}`}
      >
        <div className={styles["header-row"]}>
          <Heading size="md">Result Details</Heading>
          <Tooltip label="Download as CSV">
            <IconButton
              className={styles.icon}
              size={"xs"}
              aria-label="Download as CSV"
              icon={<Download />}
            />
          </Tooltip>
        </div>
        <Table variant="simple" size={"md"}>
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
          <IconButton
            variant="solid"
            aria-label="First page"
            icon={<ArrowLeftIcon />}
            onClick={() => detailsTable.setPageIndex(0)}
            isDisabled={!detailsTable.getCanPreviousPage()}
          />
          <IconButton
            variant="solid"
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            onClick={() => detailsTable.previousPage()}
            isDisabled={!detailsTable.getCanPreviousPage()}
          />
          <IconButton
            variant="solid"
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            onClick={() => detailsTable.nextPage()}
            isDisabled={!detailsTable.getCanNextPage()}
          />
          <IconButton
            variant="solid"
            aria-label="Last page"
            icon={<ArrowRightIcon />}
            onClick={() =>
              detailsTable.setPageIndex(detailsTable.getPageCount() - 1)
            }
            isDisabled={!detailsTable.getCanNextPage()}
          />
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
