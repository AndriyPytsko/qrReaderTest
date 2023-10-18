import { useContext, useState } from "react";
import { QrReader } from "react-qr-reader";
import { basketContext } from "../../providers/basketProvider/basketProvider";
import "./qrScanner.css";
import { InfoModal } from "./infoModal/infoModal";
import { ProductModal } from "./productModal/productModal";

const url = "https://ginocerruti.com/item/";

const defaultInfoModal = {
  isOpen: false,
  text: "",
};

export const QrScanner = () => {
  const [startScan, setStartScan] = useState(false);
  const [infoModal, setInfoModal] = useState(defaultInfoModal);
  const [productCode, setProductCode] = useState(null);
  const { addItemToBasket } = useContext(basketContext);

  const onResult = (result, error) => {
    try {
      if (result) {
        if (result?.text?.startsWith(url)) {
          const textAfterWord = result?.text?.slice(url.length)?.trim();
          setProductCode(textAfterWord?.toUpperCase());
          setStartScan(false);
        } else {
          setInfoModal({
            isOpen: true,
            text: "Please scan only Gino Cerutti QR codes.",
          });
        }
      }
    } catch (e) {
      setInfoModal({
        isOpen: true,
        text: "Unknown Error(",
      });
      console.info(e);
    }
  };

  const addProductToBasket = (products, image) => {
    products.forEach((product) => {
      addItemToBasket({
        id: `${product.code}_${product.productSizeName}_${product.productColorName}`,
        code: product.code,
        size: product.productSizeName,
        color: product.productColorName,
        count: 1,
        image,
        colorId: product.productColorId,
        sizeId: product.productSizeId,
        productId: product.productId,
      });
    });
    setProductCode(null);
  };

  return (
    <div
      className={`scannerContainer ${
        startScan ? "scannerContainerActive" : ""
      }`}
    >
      {startScan && (
        <>
          <QrReader
            constraints={{ facingMode: "environment" }}
            delay={1000}
            className="scannerBlock"
            videoContainerStyle={{
              padding: 0,
              width: "100%",
            }}
            videoStyle={{
              position: "relative",
              width: "100%",
            }}
            onResult={onResult}
            style={{ minWidth: "400px" }}
          />
        </>
      )}
      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
        className="scanButton"
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      <InfoModal
        isOpen={infoModal.isOpen}
        text={infoModal.text}
        onClick={() => setInfoModal(defaultInfoModal)}
      />
      <ProductModal
        onClose={() => setProductCode(null)}
        code={productCode}
        onClick={addProductToBasket}
      />
    </div>
  );
};
