import React, { Component } from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const TableCard = () => {
  const productList = [
    {
      name: "earphone",
      price: 100,
      available: 15
    },
    {
      name: "earphone",
      price: 1500,
      available: 30
    },
    {
      name: "iPhone x",
      price: 1900,
      available: 35
    },
    {
      name: "iPhone x",
      price: 100,
      available: 0
    },
    {
      name: "Head phone",
      price: 1190,
      available: 5
    }
  ];

  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">보유 주식</div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-24" colSpan={4}>
                종목
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                보유주 수량
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                투자 금액
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="px-0" colSpan={4}>
                  <IconButton>
                    {product.name}
                  </IconButton>
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                  {product.available ? (
                    product.available < 20 ? (
                      <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {product.available} available
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                        in stock
                      </small>
                    )
                  ) : (
                    <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                      out of stock
                    </small>
                  )}
                </TableCell>
                
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                  $
                  {product.price > 999
                    ? (product.price / 1000).toFixed(1) + "k"
                    : product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TableCard;
