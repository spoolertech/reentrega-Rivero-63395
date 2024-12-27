import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function ItemListContainer() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productosSimulados = [
    {
      id: 1,
      name: 'Pastilla de Freno A1',
      description: 'Pastillas de freno de alta calidad.',
      detailedDescription: 'Estas pastillas de freno A1 están fabricadas con materiales de alta resistencia, ofreciendo un rendimiento superior en condiciones de alta demanda. Son ideales para vehículos de uso frecuente y garantizan una mayor durabilidad.',
      images: [
        'https://api.autoplanet.cl/medias/sys_master/images/h70/h3d/9637753290782/121926_1-1682041641/121926-1-1682041641.webp',
        'https://api.autoplanet.cl/medias/sys_master/images/hfe/h4a/9637753683998/121926_2-1682041641/121926-2-1682041641.webp',
        'https://api.autoplanet.cl/medias/sys_master/images/h37/ha0/9637754077214/121926_3-1682041641/121926-3-1682041641.webp',
      ],
      price: 98150,
    },
    {
      id: 2,
      name: 'Pastilla de Freno B2',
      description: 'Pastillas de freno para vehículos de mayor tamaño.',
      detailedDescription: 'Las pastillas de freno B2 están diseñadas específicamente para vehículos grandes y pesados, asegurando un frenado efectivo incluso en condiciones extremas.',
      images: [
        'https://www.endado.com/blog/wp-content/uploads/2014/08/pastillas-de-freno.jpg',
        'https://centralderepuestostr.com/wp-content/uploads/2018/01/brake-pads.jpg.webp',
        'https://api.autoplanet.cl/medias/sys_master/images/hd8/had/9637754470430/121926_4-1682041641/121926-4-1682041641.webp',
      ],
      price: 98200,
    },
    {
      id: 3,
      name: 'Repuesto Filtro A',
      description: 'Filtro de repuesto para motores pequeños.',
      detailedDescription: 'Este filtro A es perfecto para motores pequeños. Su alta calidad asegura que los motores funcionen sin problemas, alargando su vida útil y mejorando el rendimiento del vehículo.',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_864027-MLA74933188345_032024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_961162-MLA77893181985_072024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_918418-MLA77673943838_072024-F.webp',
      ],
      price: 87450,
    },
    {
      id: 4,
      name: 'Repuesto Filtro B',
      description: 'Filtro de repuesto para motores medianos.',
      detailedDescription: 'Filtro de alta calidad para motores medianos, asegurando el rendimiento óptimo de tu motor y protegiendo sus componentes internos de contaminantes.',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_641548-MLA76125747468_052024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_933056-MLA72412714518_102023-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_697801-MLA53179785642_012023-F.webp',
      ],
      price: 68970,
    },
    {
      id: 5,
      name: 'Accesorio A',
      description: 'Accesorio para vehículos de alta gama.',
      detailedDescription: 'Este accesorio A está diseñado específicamente para vehículos de alta gama, ofreciendo funcionalidad y un toque estético elegante.',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_699355-MLA44687769264_012021-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_690691-MLA44687757954_012021-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_827367-MLA44687767355_012021-F.webp',
      ],
      price: 1200000,
    },
    {
      id: 6,
      name: 'Accesorio B',
      description: 'Accesorio compatible con varios modelos de vehículos.',
      detailedDescription: 'KIT de Escibillas Bosch Aerotwin Honda HR-V 2015 al 2020. Enganche tipo "J" En la segunda imagen puede encontrar el enganche compatible a las escobillas publicadas',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_689754-MLA41584023795_042020-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_844542-MLA25875403350_082017-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_639185-MLA41584082110_042020-F.webp',
      ],
      price: 130000,
    },
    {
      id: 7,
      name: 'Aceite Motor X',
      description: 'Aceite para motores de alto rendimiento.',
      detailedDescription: 'Aceite semi-sintético. Este tipo de productos tienen mayor resistencia a la temperatura y mejor desempeño en temperaturas bajas, por lo que resultan excelentes para la protección del motor. A su vez, conservan por más tiempo el grado de viscosidad y presentan menos evaporación que los aceites convencionales, por lo que se genera un menor consumo. Por último, al no degradarse o sedimentarse tan rápidamente, mantienen el motor del vehículo más limpio..',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_706039-MLA52024240196_102022-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_800934-MLU74110424984_012024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_972484-MLU72772526424_112023-F.webp',
      ],
      price: 180000,
    },
    {
      id: 8,
      name: 'Aceite Motor Y',
      description: 'Aceite recomendado para vehículos deportivos.',
      detailedDescription: 'El aceite motor Y es ideal para vehículos deportivos que requieren una lubricación de alta calidad para mantener su rendimiento en condiciones extremas.',
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_2X_841920-MLA77707387964_072024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_693385-MLA77926362951_072024-F.webp',
        'https://http2.mlstatic.com/D_NQ_NP_2X_653533-MLA80169822906_112024-F.webp',
      ],
      price: 190000,
    },
  ];

  useEffect(() => {
    const fetchItems = () => {
      const filteredItems = productosSimulados.filter((producto) =>
        id ? producto.name.toLowerCase().includes(id.toLowerCase()) : true
      );
      setItems(filteredItems);
    };

    fetchItems();
  }, [id]);

  const handleImageClick = (item) => {
    setCurrentItem(item);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };


  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Container>
      <h2>Productos en categoría: {id ? id : 'Todos'}</h2>
      <Row>
        {items.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={item.images[0]}
                alt={item.name}
                onClick={() => handleImageClick(item)}
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>${item.price.toLocaleString('es-AR')}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(item)}>
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      { }
      {currentItem && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentItem.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {}
              <Col md={6}>
                <img
                  src={currentItem.images[currentImageIndex]}
                  alt={currentItem.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="d-flex justify-content-between mt-3">
                  {currentItem.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`miniatura-${index}`}
                      style={{ width: '80px', height: 'auto', cursor: 'pointer' }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </Col>

              { }
              <Col md={6}>
                <h4>{currentItem.name}</h4>
                <p>{currentItem.description}</p>
                <p><strong>Descripción ampliada:</strong></p>
                <p>{currentItem.detailedDescription}</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => addToCart(currentItem)}>
              Agregar al carrito
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ItemListContainer;
