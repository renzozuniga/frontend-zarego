import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const MyDocument = (props) => {
  const styles = StyleSheet.create({
    page: {
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56,
    },
    table: {
      display: "table",
      width: "auto",
    },
    row: {
      flexDirection: "row",
    },
    firstColHeader: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#000",
      borderBottomColor: "#000",
      borderWidth: 1,
      backgroundColor: "#bdbdbd",
    },
    colHeader: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#000",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      backgroundColor: "#bdbdbd",
    },
    firstCol: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderTopWidth: 0,
    },
    col: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    cellHeader: {
      textAlign: "center",
      margin: 4,
      fontSize: 12,
      fontWeight: "bold",
    },
    cell: {
      textAlign: "center",
      margin: 5,
      fontSize: 10,
    },
  });

  const columns = [
    { label: "Country", value: "country_name" },
    { label: "Performance", value: "performance_oriented" },
    { label: "Autocratic", value: "autocratic" },
    { label: "Modesty", value: "modesty" },
    { label: "Charisma", value: "charisma" },
    { label: "Decisive", value: "decisive" },
  ];

  const { data } = props;
  const createTableHeader = () => {
    return (
      <View style={styles.row} fixed>
        {columns.map((column, index) => (
          <View
            key={`header_${index}`}
            style={index === 0 ? styles.firstColHeader : styles.colHeader}
          >
            <Text style={styles.cellHeader}>{column.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  const createTableRow = (item, idx) => {
    return (
      <View key={`row-${idx}`} style={styles.row}>
        {columns.map((column, index) => (
          <View
            key={`column_${index}`}
            style={index === 0 ? styles.firstCol : styles.col}
          >
            <Text style={styles.cell}>{item[column.value]}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="portrait">
        <View key={"unique-table"} style={styles.table}>
          {createTableHeader()}
          {data.map((item, index) => {
            return createTableRow(item, index);
          })}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
