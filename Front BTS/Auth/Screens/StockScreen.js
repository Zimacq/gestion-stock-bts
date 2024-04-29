import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Picker, SafeAreaView, Platform, TouchableOpacity, Modal, TextInput } from 'react-native';

const ProductScreen = () => {
  const [produits, setProduits] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom_produit: '',
    reference: '',
    prix_vente_unitaire: '',
    quantite_stock: '',
    taille_disponible: '',
    couleur_disponible: '',
    nom_categorie: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://10.60.136.83:8080/api/produit');
        if (!response.ok) {
          throw new Error('Failed to fetch products with status ' + response.status);
        }
        const data = await response.json();
        const formattedData = data.map(prod => ({
          ...prod,
          nom_categorie: prod.categorie.nom_categorie
        }));
        setProduits(formattedData);
        setFilteredProduits(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProduits(produits);
    } else {
      const filtered = produits.filter(prod => prod.nom_categorie === selectedCategory);
      setFilteredProduits(filtered);
    }
  }, [selectedCategory, produits]);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddProduct = () => {
    // Add logic to save the new product to the backend or perform any other action
    console.log('New product:', newProduct);
    // Close the modal
    toggleModal();
    // Reset the new product state
    setNewProduct({
      nom_produit: '',
      reference: '',
      prix_vente_unitaire: '',
      quantite_stock: '',
      taille_disponible: '',
      couleur_disponible: '',
      nom_categorie: '',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, styles.id]}>{item.id_produit}</Text>
      <Text style={[styles.itemText, styles.name]}>{item.nom_produit}</Text>
      <Text style={[styles.itemText, styles.reference]}>{item.reference}</Text>
      <Text style={[styles.itemText, styles.price]}>{`${item.prix_vente_unitaire} €`}</Text>
      <Text style={[styles.itemText, styles.stock]}>{item.quantite_stock}</Text>
      <Text style={[styles.itemText, styles.size]}>{item.taille_disponible}</Text>
      <Text style={[styles.itemText, styles.color]}>{item.couleur_disponible}</Text>
      <Text style={[styles.itemText, styles.category]}>{item.nom_categorie}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {error ? <Text style={styles.errorText}>Erreur: {error}</Text> : null}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
        style={styles.pickerStyle}
        itemStyle={styles.pickerItemStyle}>
        <Picker.Item label="All" value="all" />
        {[...new Set(produits.map(item => item.nom_categorie))].map(category => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Text style={styles.buttonText}>Ajouter un produit</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredProduits}
        keyExtractor={item => item.id_produit.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<View style={styles.headerContainer}>
          <Text style={[styles.headerText, styles.id]}>ID</Text>
          <Text style={[styles.headerText, styles.name]}>Nom</Text>
          <Text style={[styles.headerText, styles.reference]}>Référ.</Text>
          <Text style={[styles.headerText, styles.price]}>Prix</Text>
          <Text style={[styles.headerText, styles.stock]}>Stock</Text>
          <Text style={[styles.headerText, styles.size]}>Taille</Text>
          <Text style={[styles.headerText, styles.color]}>Couleur</Text>
          <Text style={[styles.headerText, styles.category]}>Catégorie</Text>
        </View>}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un produit</Text>
            <TextInput
              placeholder="Nom du produit"
              value={newProduct.nom_produit}
              onChangeText={text => setNewProduct({...newProduct, nom_produit: text})}
              style={styles.input}
            />
            {/* Add more TextInput components for other fields */}
            <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: 'white',
  },
  itemText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  pickerStyle: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  pickerItemStyle: {
    height: 44,
    color: 'blue', // Example color
  },
  id: { width: itemWidth },
  name: { width: itemWidth * 2 },
  reference: { width: itemWidth },
  price: { width: itemWidth, textAlign: 'right' },
  stock: { width: itemWidth, textAlign: 'right' },
  size: { width: itemWidth },
  color: { width: itemWidth },
  category: { width: itemWidth },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ProductScreen;
