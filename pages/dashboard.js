import React, { useCallback, useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { PageHeader, Button, Statistic, Row, Col, InputNumber } from "antd";

const Dashboard = ({ data }) => {
  const [temperature, setTemperature] = useState(0);

  const updateTemperature = useCallback(async () => {
    const res = await fetch(`/api/temperature`, {
      method: "post",
      body: JSON.stringify({
        date: Date.now(),
        temperature,
      }),
    });

    console.log(res);
  }, [temperature]);

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
                  title="Latest Entry"
                  value={data.temperature}
                  precision={1}
                />
                <span>Last updated: {data.date}</span>
              </Col>
            </Row>
          </PageHeader>

          <div className="temperature-form">
            <p>Enter latest temperature</p>
            <InputNumber
              min={0}
              max={200}
              step={1}
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
  const res = await fetch(`${process.env.DOMAIN}api/temperature`);
  const json = await res.json();

  return { data: json };
};

export default Dashboard;
