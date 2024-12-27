import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useCart();

  const productosSimulados = [
    {
      id: 1,
      name: 'Pastilla de Freno A1',
      description: 'Pastillas de freno de alta calidad.',
      images: [
        'https://api.autoplanet.cl/medias/sys_master/images/h70/h3d/9637753290782/121926_1-1682041641/121926-1-1682041641.webp',
        'https://api.autoplanet.cl/medias/sys_master/images/hfe/h4a/9637753683998/121926_2-1682041641/121926-2-1682041641.webp',
      ],
      price: 98150,
    },
    {
      id: 2,
      name: 'Pastilla de Freno B2',
      description: 'Pastillas de freno para vehículos de mayor tamaño.',
      images: [
        'https://www.endado.com/blog/wp-content/uploads/2014/08/pastillas-de-freno.jpg',
        'https://centralderepuestostr.com/wp-content/uploads/2018/01/brake-pads.jpg.webp',
      ],
      price: 98200,
    },

  ];

  useEffect(() => {
    const fetchItem = () => {
      const foundItem = productosSimulados.find((producto) => producto.id === parseInt(id));
      setItem(foundItem);
    };

    fetchItem();
  }, [id]);

  if (!item) return <div>Cargando...</div>;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={item.images[0]} alt={item.name} />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text><strong>Precio:</strong> ${item.price.toLocaleString('es-AR')}</Card.Text>
              <Button
                variant="primary"
                onClick={() => addToCart(item)}>
                Agregar al carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetailContainer;
