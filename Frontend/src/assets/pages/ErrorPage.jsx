import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Content,
  FlexboxGrid,
  IconButton,
  ButtonToolbar,
} from "rsuite";
import ArowBackIcon from "@rsuite/icons/ArowBack";

const someMessages = [
  "We are sorry but the page you are looking for was not found",
  "The current page is unavailable or you do not have permission to access",
  "We are sorry but our server encountered an internal error",
];

const getMessage = (num) => {
  if (num === '404')
    return someMessages[0]
  else if (num === '403')
    return someMessages[1]
  else
    return someMessages[2]
}

const getFileName = (num) => {
  return `${num}.svg`
}

export default function ErrorPage({ num }) {
  const [pageNo, setPageNo] = useState("")
  const fileName = useMemo(() => {
    return getFileName(num)
  }, [pageNo])
  const errMsg = useMemo(() => {
    return getMessage(num)
  }, [pageNo]);
  useEffect(() => {
    setPageNo(num)
  },[])
  return (
    <div>
      <Container style={{height:'100vh', padding:'100px'}}>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <img src={fileName} height={200} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <h1>{num}</h1>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <h4>Oops… You just found an error page</h4>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <p>{errMsg}</p>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center" style={{marginTop:'20px'}}>
            <FlexboxGrid.Item>
              <ButtonToolbar>
                <IconButton
                  href="/"
                  appearance="primary"
                  icon={<ArowBackIcon />}
                >
                  Take me home
                </IconButton>
              </ButtonToolbar>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
