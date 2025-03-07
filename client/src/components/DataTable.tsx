import React, { ReactNode, useMemo } from "react";

import { map } from "lodash";

import { Button, Flex, Skeleton, Table } from "@radix-ui/themes";
import styled from "styled-components";
import { PagedResponse } from "../store/api";

const ColumnHeader = styled(Table.ColumnHeaderCell).attrs({ p: "3" })`
  color: var(--gray-12, #2b333b);
  line-height: 20px;
`;

// Define the column interface with a union type for property
export interface TableColumn<T> {
  property: keyof T | string; // Can be a real property of T or a virtual property like "actions"
  name: string;
  width?: number; // Optional number representing fraction of total width (0-1)
  renderCell?: (row: T) => ReactNode;
}
// This table is designed to be used with data from PagedResponse. If onPageChange is defined, then it will render a final row with Pagination functionality
export interface DataTableProps<T> extends PagedResponse<T> {
  columns: TableColumn<T>[];
  page?: number;
  loading?: boolean; // New loading property
  refetching?: boolean; // New loading property
  onPageChange?: (page: number) => void;
  numberLoadingRows?: number; // number of skeleton rows to render when loading
}

// Extend the default generic constraint to allow for "virtual" columns like actions where you render a menu to edit/delete
function DataTable<T extends object = Record<string, unknown>>({
  columns,
  data,
  page = 1,
  pages = 1,
  prev = null,
  next = null,
  loading = false,
  refetching = false,
  onPageChange,
  numberLoadingRows = 10,
}: DataTableProps<T>) {
  // Calculate column widths as percentages
  const columnWidths = useMemo(() => {
    // Get sum of defined widths
    const definedWidths = columns
      .filter((col) => col.width !== undefined)
      .reduce((sum, col) => sum + (col.width || 0), 0);

    // Check if defined widths exceed 1 (100%)
    if (definedWidths > 1) {
      throw new Error(
        "Column widths exceed 100%: the sum of defined widths must be <= 1",
      );
    }

    // Count columns without defined widths
    const undefinedWidthColumns = columns.filter(
      (col) => col.width === undefined,
    ).length;

    // Calculate remaining width percentage for undefined columns
    const remainingWidth = 1 - definedWidths;
    const defaultWidth =
      undefinedWidthColumns > 0 ? remainingWidth / undefinedWidthColumns : 0;

    // Return width percentages for each column
    return columns.map((col) =>
      col.width !== undefined
        ? `${col.width * 100}%`
        : `${defaultWidth * 100}%`,
    );
  }, [columns]);

  // Helper function to safely convert any value to a string React node
  const safeToReactNode = (value: unknown): ReactNode => {
    if (value === null || value === undefined) {
      return "";
    }
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }
    if (React.isValidElement(value)) {
      return value;
    }
    // For objects, arrays, or anything else, convert to string
    return JSON.stringify(value);
  };

  // Render skeleton rows when loading
  const renderSkeletonRows = () => {
    const skeletonRows = [];

    for (let i = 0; i < numberLoadingRows; i++) {
      skeletonRows.push(
        <Table.Row key={`skeleton-row-${i}`} align="center">
          {map(columns, (_, columnIndex) => {
            return columnIndex === 0 ? (
              <Table.RowHeaderCell
                key={`skeleton-cell-${columnIndex}`}
                px="3"
                style={{ width: columnWidths[columnIndex] }}
              >
                <Skeleton style={{ height: "20px", width: "100%" }} />
              </Table.RowHeaderCell>
            ) : (
              <Table.Cell
                key={`skeleton-cell-${columnIndex}`}
                px="3"
                style={{ width: columnWidths[columnIndex] }}
              >
                <Skeleton style={{ height: "20px", width: "100%" }} />
              </Table.Cell>
            );
          })}
        </Table.Row>,
      );
    }

    return skeletonRows;
  };

  return (
    <Table.Root variant="surface" size="1" style={{ minHeight: "400px" }}>
      <Table.Header>
        <Table.Row>
          {map(columns, (column, index) => (
            <ColumnHeader
              key={column.name}
              style={{ width: columnWidths[index] }}
            >
              {column.name}
            </ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {loading
          ? renderSkeletonRows()
          : map(data, (row, rowIndex) => (
              <Table.Row key={`row-${rowIndex}`} align="center">
                {map(columns, (column, columnIndex) => {
                  // Use renderCell function if provided, otherwise safely get and convert the value
                  let cellContent: ReactNode;
                  if (column.renderCell) {
                    cellContent = column.renderCell(row);
                  } else {
                    // Check if the property exists on the row (using type assertion for safety)
                    const propKey = column.property as string;
                    if (propKey in row) {
                      cellContent = safeToReactNode(row[propKey as keyof T]);
                    } else {
                      cellContent = "";
                    }
                  }

                  return columnIndex === 0 ? (
                    <Table.RowHeaderCell
                      key={`${String(column.property)}-${columnIndex}`}
                      px="3"
                      style={{ width: columnWidths[columnIndex] }}
                    >
                      {cellContent}
                    </Table.RowHeaderCell>
                  ) : (
                    <Table.Cell
                      key={`${String(column.property)}-${columnIndex}`}
                      px="3"
                      style={{ width: columnWidths[columnIndex] }}
                    >
                      {cellContent}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
        {onPageChange && (
          <Table.Row>
            {/* Handle filler cells so that pagination is always the last two cells */}
            {columns.length > 2 &&
              map(columns.slice(0, -2), (_, index) => (
                <Table.Cell key={`pagination-spacer-${index}`}></Table.Cell>
              ))}
            <Table.Cell>
              Page {page} of {pages}
            </Table.Cell>
            <Table.Cell>
              <Flex gap="3" justify="end">
                <Button
                  size="1"
                  color="gray"
                  disabled={!prev || loading || refetching}
                  variant="outline"
                  onClick={() => prev && onPageChange(prev)}
                >
                  Previous
                </Button>
                <Button
                  size="1"
                  color="gray"
                  variant="outline"
                  disabled={!next || loading || refetching}
                  onClick={() => next && onPageChange(next)}
                >
                  Next
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}

export default DataTable;
