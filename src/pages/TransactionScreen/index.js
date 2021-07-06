import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {baseUrl} from '../../Rest';

const TransactionScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setData(json);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>Test</Text>
    </SafeAreaView>
  );
};

export default TransactionScreen;
