import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  ColorValue,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {colors} from '../styles/colors';
import {Icon} from '@rneui/themed';
import {RecipeScreen} from '../RecipeScreen';
import {ingredientItem} from '../RecipeScreen';

type headerProps = {
  title: String;
  color: ColorValue;
};

type cardItemProps = {
  titleBackground?: ColorValue | undefined;
  uri: string;
  title: string;
  ingredientList?: ingredientItem[];
  instructions?: string;
  userEmail?: string;
  onPressFavorite?: (email: string, title: string) => void;
  isFavorite?: boolean;
};

interface heartProps extends TouchableOpacityProps {
  heartBackgroundColor: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
}
export const CardItem = (props: cardItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const onPressFavorite = (email: string, title: string) => {
    if (props.onPressFavorite) {
      props.onPressFavorite(email, title);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <View>
      <RecipeScreen
        recipeName={props.title}
        isVisible={isVisible}
        source={{uri: props.uri}}
        onHide={() => setIsVisible(!isVisible)}
        ingredients={props.ingredientList}
        instructions={props.instructions}
      />

      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: props.uri}}
          imageStyle={styles.cardRadius}>
          <View
            style={[
              styles.textContainer,
              {backgroundColor: props.titleBackground},
            ]}>
            <Text style={styles.text}> {props.title}</Text>
          </View>
          <FavoriteIcon
            heartBackgroundColor={
              isFavorite === true ? colors.red : colors.goldenRod
            }
            onPress={() => onPressFavorite(props.userEmail ?? '', props.title)}
          />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export const FavoriteIcon = (props: heartProps) => {
  return (
    <View style={props.containerStyle ?? styles.favoriteContainer}>
      <TouchableOpacity
        style={[
          styles.heartIconContainer,
          {backgroundColor: props.heartBackgroundColor},
        ]}
        {...props}>
        <Icon name="heart" color={colors.white} size={20} type="ionicon" />
      </TouchableOpacity>
    </View>
  );
};

export const ListHeader = (props: headerProps) => {
  return (
    <View style={styles.listHeaderContainer}>
      <Text style={[{color: props.color}, styles.textHeader]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: 170,
    height: 160,
    margin: 8,
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-start',
    height: 50,
    opacity: 0.6,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Barlow',
    fontWeight: '900',
    textAlign: 'left',
  },
  listHeaderContainer: {
    margin: 8,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Barlow',
    fontWeight: 'normal',
  },
  cardRadius: {
    borderRadius: 20,
  },
  favoriteContainer: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  heartIconContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
