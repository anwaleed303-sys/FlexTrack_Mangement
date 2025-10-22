import { Form, Input, Button, Card, Typography } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";

const { Title } = Typography;

export default function Verify2FA() {
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("2FA Code:", values);
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>2FA Verification | FlexTrack</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Card style={{ width: 400 }}>
          <Title level={2} style={{ textAlign: "center" }}>
            Enter 2FA Code
          </Title>
          <Form name="verify2fa" onFinish={onFinish} layout="vertical">
            <Form.Item name="code" rules={[{ required: true, len: 6 }]}>
              <Input
                placeholder="000000"
                size="large"
                maxLength={6}
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  letterSpacing: "10px",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Verify
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
