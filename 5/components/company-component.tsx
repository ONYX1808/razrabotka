import { companyData } from "@/data/company-data";
import { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Card, Modal, Portal } from "react-native-paper";

export default function CompanyComponent() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const company = companyData[index];

  const onImageLongPress = () => {
    setShowModal(true);
  }

  const onPreviousPress = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const onNextPress = () => {
    if (index < companyData.length - 1) {
      setIndex(index + 1);
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { width: 250, height: 250, marginBottom: 10 },
    title: { fontSize: 24, fontWeight: "bold" },
    buttonContainer: { flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 10 },
    modal: { flex: 1, justifyContent: "center", alignItems: "center" },
    modalCard: { width: '60%', alignItems: "center", padding: 16 },
  });

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onLongPress={onImageLongPress}>
          <Image
            source={{ uri: company.imageURL }}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{company.name}</Text>
        <Text>{company.ticker} ({company.country})</Text>
        <Text> ${company.capitalization}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onPreviousPress} disabled={index === 0}>Previous</Button>
          <Button onPress={onNextPress} disabled={index === companyData.length - 1}>Next</Button>
        </View>
      </View>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          style={styles.modal}
        >
          <Card style={styles.modalCard}>
            <Text>Логотип компаний</Text>
            <Button onPress={() => setShowModal(false)} >Закрыть</Button>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}
