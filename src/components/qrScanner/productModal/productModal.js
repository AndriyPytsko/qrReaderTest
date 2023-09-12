import React, { useEffect, useState } from "react";
import "./productModal.css";
import { apiProduct } from "../../../api/api.product";
import { MenuItem, Select } from "@mui/material";

export function ProductModal(props) {
  const { code, onClick, onClose } = props;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (code) getProductInfo(code);
  }, [code]);

  const getProductInfo = async (code) => {
    const dataInfo = await apiProduct.getProductInfo(code);
    const dataImage = await apiProduct.getProductImage(code);
    const colors = [...new Set(dataInfo.map((item) => item.productColorName))];
    const activeSize = dataInfo.find(
      (item) => item.productColorName === colors[0]
    ).productSizeName;
    setProductInfo({
      images: dataImage.map((item) => item.url),
      info: dataInfo,
      colors,
      activeColor: colors[0],
      activeSizes: [activeSize],
    });
  };

  const handleChangeColor = (e) => {
    const activeColor = e.target.value;
    setProductInfo((prevState) => ({
      ...prevState,
      activeColor,
      activeSizes: [
        prevState.info.find((item) => item.productColorName === activeColor)
          .productSizeName,
      ],
    }));
  };

  const handleChangeSize = (isActive, newSize) => {
    setProductInfo((prevState) => {
      const activeSizes = isActive
        ? [...prevState.activeSizes.filter((size) => size !== newSize)]
        : [...prevState.activeSizes, newSize];
      return {
        ...prevState,
        activeSizes: !activeSizes.length ? prevState.activeSizes : activeSizes,
      };
    });
  };

  if (!code) return null;

  return (
    <div className="productModalWrapper">
      <div className="productModalContainer">
        {productInfo ? (
          <>
            <img className="productModalImage" src={productInfo.images[0]} />
            <div className="productModalColors">
              <span>Color: </span>
              <Select
                onChange={handleChangeColor}
                id="select"
                value={productInfo.activeColor}
              >
                {productInfo.colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="productModalSizes">
              {productInfo.info
                .filter(
                  (item) => item.productColorName === productInfo.activeColor
                )
                .map((item) => {
                  const newSize = item.productSizeName;
                  const isActive = productInfo.activeSizes.find(
                    (size) => size === newSize
                  );
                  return (
                    <span
                      className={`productSizeChip ${
                        isActive ? "productSizeChipActive" : ""
                      }`}
                      key={newSize}
                      onClick={() => handleChangeSize(isActive, newSize)}
                    >
                      {newSize}
                    </span>
                  );
                })}
            </div>
            <div className="productModalButtonContainer">
              <button
                onClick={() =>
                  onClick(
                    code,
                    productInfo.activeSizes,
                    productInfo.activeColor,
                    productInfo.images[0]
                  )
                }
                className="productModalButton"
              >
                Add to basket
              </button>
              <button onClick={onClose} className="productModalButton">
                Close
              </button>
            </div>
          </>
        ) : (
          <div className="loadingModal">Loading...</div>
        )}
      </div>
    </div>
  );
}
