import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Success = ({ orderId }: { orderId?: string }) => (
  <div
    style={{
      maxWidth: 420,
      margin: "60px auto",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      padding: "36px 32px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 48, color: "#3b82f6", marginBottom: 12 }}>✔️</div>
    <h2>결제가 완료되었습니다!</h2>
    <div
      style={{
        background: "#f3f6fa",
        borderRadius: 8,
        padding: "18px 0",
        margin: "18px 0",
        fontSize: 16,
        textAlign: "left",
      }}
    >
      <div>
        <b>주문번호:</b> {orderId || "12345678"}
      </div>
      <div>
        <b>결제금액:</b> 4,797,500원
      </div>
      <div>
        <b>배송지:</b> 서울특별시 강남구 테헤란로 123
      </div>
      <div>
        <b>결제수단:</b> 신용/체크카드
      </div>
    </div>
    <div style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
      주문/배송 조회는 마이페이지에서 확인하실 수 있습니다.
      <br />
      빠른 배송을 위해 최선을 다하겠습니다.
    </div>
    <div>
      <button
        style={{
          margin: "0 8px",
          padding: "10px 24px",
          border: "none",
          borderRadius: 6,
          background: "#3b82f6",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/mypage")}
      >
        마이페이지로 이동
      </button>
      <button
        style={{
          margin: "0 8px",
          padding: "10px 24px",
          border: "none",
          borderRadius: 6,
          background: "#e5e7eb",
          color: "#374151",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/")}
      >
        쇼핑 계속하기
      </button>
    </div>
  </div>
);

const Fail = ({ errorMsg }: { errorMsg?: string }) => (
  <div
    style={{
      maxWidth: 420,
      margin: "60px auto",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      padding: "36px 32px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 48, color: "#ef4444", marginBottom: 12 }}>❌</div>
    <h2>결제에 실패하였습니다</h2>
    <div
      style={{
        background: "#f3f6fa",
        borderRadius: 8,
        padding: "18px 0",
        margin: "18px 0",
        fontSize: 16,
        textAlign: "left",
      }}
    >
      <div>
        <b>실패 사유:</b> {errorMsg || "알 수 없는 오류가 발생했습니다."}
      </div>
    </div>
    <div style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
      결제 정보를 다시 확인해 주세요.
      <br />
      문제가 지속될 경우 고객센터로 문의해 주세요.
    </div>
    <div>
      <button
        style={{
          margin: "0 8px",
          padding: "10px 24px",
          border: "none",
          borderRadius: 6,
          background: "#3b82f6",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/cart")}
      >
        장바구니로 돌아가기
      </button>
      <button
        style={{
          margin: "0 8px",
          padding: "10px 24px",
          border: "none",
          borderRadius: 6,
          background: "#e5e7eb",
          color: "#374151",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/")}
      >
        메인으로
      </button>
    </div>
  </div>
);

const CheckoutPage: React.FC = () => {
  const query = useQuery();
  const result = query.get("result"); // 'success' or 'fail'
  const orderId = query.get("orderId");
  const errorMsg = query.get("msg");

  if (result === "success") {
    return <Success orderId={orderId || undefined} />;
  }
  if (result === "fail") {
    return <Fail errorMsg={errorMsg || undefined} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: 24 }}>결제 정보 입력</h2>
      
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Here you would typically handle the payment process
          // For now, we'll just redirect to the success page
          window.location.href = "/checkout?result=success&orderId=12345678";
        }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 8 }}>배송지 정보</label>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                marginBottom: 12,
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 8 }}>결제 수단</label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
              }}
            >
              <option value="card">신용/체크카드</option>
              <option value="bank">계좌이체</option>
              <option value="phone">휴대폰 결제</option>
            </select>
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "12px 32px",
                border: "none",
                borderRadius: 6,
                background: "#3b82f6",
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              결제하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
