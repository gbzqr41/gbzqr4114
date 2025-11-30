import QrViewContent from "@/components/qr-view/QrViewContent";

export default function QrViewPage() {
  return (
    <>
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div style={{ height: '100vh', overflow: 'auto', position: 'relative', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <QrViewContent />
      </div>
    </>
  );
}





