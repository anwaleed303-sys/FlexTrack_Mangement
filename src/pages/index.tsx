import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Welcome | FlexTrack</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #0066FF, #00D4B1)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "36px",
            animation: "scaleIn 0.6s ease-out",
            boxShadow: "0 8px 24px rgba(0,102,255,0.3)",
          }}
        >
          FT
        </div>
        {/* <div
          style={{
            marginTop: 24,
            fontSize: 28,
            fontWeight: 600,
            color: "#262626",
            animation: "fadeIn 0.8s ease-out 0.3s both",
          }}
        >
          Welcome to FlexTrack
        </div> */}
        <style jsx>{`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
