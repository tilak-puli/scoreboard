import {View} from 'react-native';
import {Menu, TextInput} from 'react-native-paper';
import React, {useState} from 'react';

const AutoSuggest = ({
  value = '',
  label,
  data,
  containerStyle,
  onChange: origOnChange,
  icon = 'bike',
  style = {},
  menuStyle = {},
  right = () => {},
  left = () => {},
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = text => {
    return data
      .filter(val => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1)
      .slice(0, 5);
  };
  return (
    <View style={[containerStyle]}>
      <TextInput
        onFocus={() => {
          if (value.length === 0) {
            setMenuVisible(true);
          }
        }}
        onBlur={() => setMenuVisible(false)}
        label={label}
        right={right}
        left={left}
        style={style}
        onChangeText={text => {
          origOnChange(text);
          if (text && text.length > 0) {
            setFilteredData(filterData(text));
          } else if (text && text.length === 0) {
            setFilteredData(data);
          }
          setMenuVisible(true);
        }}
        value={value}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            zIndex: 10,
            borderColor: 'grey',
            borderRadius: 3,
            position: 'absolute',
            width: '100%',
            top: 55,
          }}>
          {filteredData.map((datum, i) => (
            <Menu.Item
              key={i}
              style={[{width: '100%', height: 35}, 10, menuStyle]}
              icon={icon}
              onPress={() => {
                origOnChange(datum);
                setMenuVisible(false);
              }}
              title={datum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default AutoSuggest;
