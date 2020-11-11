import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import axios from 'axios';

function AppleNews() {
  const [newsList, setNews] = useState(null);

  useEffect(() =>{
    axios.get(`http://localhost:8080/nasdaq/apple_news`)
    .then( res => {
      setNews(res.data)
    })
  }, [])

  return (
    <div className="TeslaNews">
      <h1>Apple News</h1>
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">Top News List</div>
      <div className="overflow-auto">
        <Table className="news-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-24" colSpan={4}>
                Headline
              </TableCell>
              <TableCell className="px-24" colSpan={2}>
                Date ⏰
              </TableCell>
              <TableCell className="px-0" colSpan={4}>
                Content
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Link
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {newsList && newsList.map((news, index) => (
                

              <TableRow key={index}>
                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                  <div className="flex flex-middle">
                    <img
                      className="circular-image-medium"
                      src={news.image}
                      alt=""
                    />
                    <p className="m-0 ml-8">{news.headline}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0" align="left" colSpan={2}>
                <p>{new Date(news.date).toDateString()} </p> 
                </TableCell>
                <TableCell className="px-0" align="left" colSpan={4}>
                  {news.content}
                </TableCell>

                <TableCell className="px-0" colSpan={1}>
                  <IconButton>
                    <Icon color="secondary"> link </Icon>
                    <a href={news.link} > link </a>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
    </div>
  );
};

export default AppleNews;