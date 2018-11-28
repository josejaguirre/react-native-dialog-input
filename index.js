import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';

class DialogInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = { inputModal: '', openning: true };
  }

  render() {
    const title = this.props.title || '';
    const hintInput = this.props.hintInput || '';
    const value = (!this.state.openning) ? this.state.inputModal : null;
    const textProps = this.props.textInputProps || null;
    const modalStyleProps = this.props.modalStyle || {};
    const dialogStyleProps = this.props.dialogStyle || {};
    const isSecure = this.props.isSecure || false;

    let cancelText = this.props.cancelText || 'Cancel';
    let submitText = this.props.submitText || 'Submit';
    
    cancelText = (Platform.OS === 'ios') ? cancelText : cancelText.toUpperCase();
    submitText = (Platform.OS === 'ios') ? submitText : submitText.toUpperCase();

    return(
      <Modal
        animationType="fade"
        transparent
        visible={ this.props.isDialogVisible }
        onRequestClose={() => {
          this.props.closeDialog();
          this.state = { inputModal: '' };
        }}>
        <View style={ [styles.container, {...modalStyleProps}] }  >
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => { this.props.closeDialog(); this.setState({ openning: true })} }
          >
            <View style={ [styles.modalContainer, {...dialogStyleProps}] } >
              <View style={ styles.modalBody} >
                <Text style={ styles.titleModal}>{ title }</Text>
                <Text style={ [this.props.message ? styles.messageModal : { height: 0 } ] }>
                  { this.props.message }
                </Text>
                <TextInput style={styles.inputContainer}
                  autoCorrect={ !(textProps && !(textProps.autoCorrect)) }
                  autoCapitalize={ (textProps && textProps.autoCapitalize) ? textProps.autoCapitalize : 'none' }
                  clearButtonMode={ (textProps && textProps.clearButtonMode) ? textProps.clearButtonMode : 'never' }
                  clearTextOnFocus={ (textProps && textProps.clearTextOnFocus) }
                  keyboardType={ (textProps && textProps.keyboardType) ? textProps.keyboardType : 'default' }
                  autoFocus
                  onKeyPress={ () => this.setState({ openning: false }) }
                  underlineColorAndroid='transparent'
                  placeholder={ hintInput }
                  secureTextEntry={ isSecure }
                  onChangeText={ (inputModal) => this.setState({inputModal}) }
                  value={ value }
                  />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.touchModal}
                  onPress={() => {
                    this.props.closeDialog();
                    this.setState({ openning: true })
                  }}
                >
                  <Text style={styles.buttonModalLeft}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.dividerButton}></View>
                <TouchableOpacity
                  style={styles.touchModal}
                  onPress={() => {
                    this.props.submitInput(this.state.inputModal);
                    this.setState({ openning: true })
                  }}
                >
                  <Text style={styles.buttonModalRight}>{ submitText }</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const baseStyle = {
  baseContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create({
  container:{
    ...baseStyle.baseContainer,
    ...Platform.select({
      android:{
        backgroundColor: 'rgba(0,0,0,0.64)'
      }
    }),
  },
  innerContainer: {
    ...baseStyle.baseContainer,
  },
  modalContainer:{
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor:'#E3E6E7',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor:'#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modalBody:{
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  titleModal:{
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign:'center',
        marginBottom: 5,
      },
      android: {
        textAlign:'left',
      },
    }),
  },
  messageModal:{
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign:'center',
        marginBottom: 10,
      },
      android: {
        textAlign:'left',
        marginTop: 20
      },
    }),
  },
  inputContainer:{
    textAlign:'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
	      borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android:{
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      }
    }),
  },
  dividerButton:{
    ...Platform.select({
      ios:{
      	width: 1,
        backgroundColor: '#B0B0B0',
      },
      android:{
	      width: 0
      },
    }),
  },
  touchModal:{
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android:{
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      }
    }),
  },
  buttonModalLeft:{
    ...Platform.select({
      fontWeight: "bold",
      ios: {
        fontSize:18,
        color:'#408AE2',
        textAlign:'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
	      height: 48,
	      maxHeight: 48,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
  buttonModalRight:{
    ...Platform.select({
      fontWeight: "bold",
      ios: {
        fontSize:18,
        color:'#408AE2',
        textAlign:'center',
        padding: 10,
      },
      android: {
        textAlign:'right',
        color:'#009688',
        padding: 8
      },
    }),
  },
});

export default DialogInput;
