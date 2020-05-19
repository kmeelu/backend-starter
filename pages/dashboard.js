import React, { useCallback, useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import {
  PageHeader,
  Button,
  Table,
  Statistic,
  Row,
  Col,
  InputNumber,
} from "antd";

const Dashboard = ({ data, covidData }) => {
  const [temperature, setTemperature] = useState(0);

  const updateTemperature = useCallback(async () => {
    const res = await fetch("http://localhost:3000/api/temperature", {
      method: "post",
      body: JSON.stringify({
        date: Date.now(),
        temperature,
      }),
    });

    console.log(res);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Backend Starter | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ width: 720, margin: "0 auto" }}>
          <PageHeader
            ghost={false}
            title="Dashboard"
            subTitle="Track your Temperature"
            extra={[
              <Button key="1" href="/api/logout">
                Logout
              </Button>,
            ]}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Latest Temperature"
                  value={112893}
                  precision={1}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Average Temperature"
                  value={112893}
                  precision={1}
                />
              </Col>
            </Row>
          </PageHeader>

          <div className="temperature-form">
            <p>Enter latest temperature</p>
            <InputNumber
              min={0}
              max={200}
              step={0.1}
              value={temperature}
              onChange={setTemperature}
              style={{ marginRight: "16px" }}
            />
            <Button onClick={updateTemperature} type="primary">
              Submit New Temperature
            </Button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 780px;
        }

        .temperature-form {
          padding: 16px 24px;
        }
      `}</style>
    </div>
  );
};

Dashboard.getInitialProps = async () => {
  const { user } = await auth0.getSession(req);
  if (!user) {
    res.writeHead(302, {
      Location: "/api/login",
    });
    res.end();
    return;
  }

  const res = await fetch("http://localhost:3000/api/temperature");
  console.log(res);
  const json = await res.json();

  const covidRes = await fetch(
    "https://covidtracking.com/api/v1/states/current.json"
  );
  console.log(covidRes);
  const covidJson = await covidRes.json();

  return { data: json, covidData: covidJson };
};

export default Dashboard;
