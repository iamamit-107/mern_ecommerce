import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Paginate from "../components/Paginate";
import {
  clearCreatedProduct,
  createProduct,
  deleteProduct,
  fetchProducts,
} from "../redux/reducers/productReducer";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";
import Helmet from "react-helmet";

const ProductListScreen = ({ history }) => {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productLists);
  const {
    loading,
    pages,
    page,
    error,
    products,
    deleteLoading,
    createdProduct,
    createLoading,
    createSuccess,
    createError,
  } = productList;

  useEffect(() => {
    dispatch(clearCreatedProduct());
    if (createSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(fetchProducts({ pageNumber }));
    }
  }, [dispatch, createSuccess, pageNumber]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Product Lists</title>
      </Helmet>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3"
            onClick={createProductHandler}
            disabled={createLoading}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                      disabled={deleteLoading}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
