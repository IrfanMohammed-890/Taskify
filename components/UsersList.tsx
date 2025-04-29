// import { View, Text, ScrollView, StyleSheet } from 'react-native';

// export default function UserList() {
//   const users = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
//   ];

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <View>
//           {/* Table Header */}
//           <View style={[styles.row, styles.headerRow]}>
//             <Text style={[styles.cell, styles.headerText]}>Name</Text>
//             <Text style={[styles.cell, styles.headerText]}>Email</Text>
//             <Text style={[styles.cell, styles.headerText]}>Role</Text>
//           </View>

//           {/* Table Data */}
//           {users.map((user) => (
//             <View key={user.id} style={styles.row}>
//               <Text style={styles.cell}>{user.name}</Text>
//               <Text style={styles.cell}>{user.email}</Text>
//               <Text style={styles.cell}>{user.role}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F9FAFB',
//     flex: 1,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1F2937',
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//     alignItems: 'center',
//     minWidth: 600,
//   },
//   headerRow: {
//     backgroundColor: '#EEF2FF',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   cell: {
//     flex: 1,
//     fontSize: 14,
//     color: '#374151',
//     paddingHorizontal: 8,
//   },
//   headerText: {
//     fontWeight: '600',
//     color: '#4F46E5',
//   },
// });


import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

export default function UserList() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{user.name}</Text>
              <TouchableOpacity onPress={() => console.log('Delete user', user.id)}>
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.detail}>Email: {user.email}</Text>
            <Text style={styles.detail}>Role: {user.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2, // for Android
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  detail: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
});
