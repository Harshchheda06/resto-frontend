import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlide";
import { loginRedux } from "./redux/userSlice"; // Import loginRedux
import Footer from "./component/Footer";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and update Redux store
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/products/`);
        const resData = await res.json();
        dispatch(setDataProduct(resData));

        // Check if there's a user in localStorage and dispatch loginRedux
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          dispatch(loginRedux({ data: JSON.parse(storedUser) }));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [dispatch]); // Only run once on mount

  return (
    <>
      <Toaster />
      <div>
        <Header /> {/* Render Header only once */}
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
