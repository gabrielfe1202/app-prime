import { fonts } from "@/app/globalStyle";
import { ViewPagerRef } from "@/components/ViewPager/react-augment";
import { ViewPager } from "@/components/ViewPager/ViewPager";
import { useGoal } from "@/contexts/goal-context";
import { DI } from "@/controllers/DI";
import { Goal, GoalStep } from "@/entities/goal";
import { delay } from "@/utils/delay";
import { asyncArrayToState, useAsync } from "@/utils/use-async";
import { useEffect, useRef, useState } from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('screen');

export function Steps() {
  const { selectedGoal } = useGoal();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*
      usado para escutar transições de mudança de e assim disparar
      um fake loading e mudar os steps
    */
    setIsLoading(true);
    delay(500).then(() => setIsLoading(false));
  }, [selectedGoal]);

  if (!selectedGoal.state) return <></>;
  if (isLoading) {
    return <Text
      style={{ color: 'white', paddingHorizontal: 24 }}
    >
      Carregando Passos...
    </Text>
  }

  return <Main goal={selectedGoal.state} />
}

type Props = { goal: Goal };
function Main({ goal }: Props) {
  const { selectedGoal, goalVPRef } = useGoal();

  const stepsVPRef = useRef<ViewPagerRef<GoalStep>>(null);

  const details = useAsync(
    async () => DI.goal.FindGoalStep(goal.$clientId),
    [goal.$clientId],
  );

  const steps = details.state === 'SUCCESS' ? details.data?.steps ?? [] : [];

  useEffect(() => {
    const lastId = selectedGoal.state?.last_goal_answered_id;

    if (!lastId) return;

    stepsVPRef.current?.gotoPageWhere(p => p.id === lastId);
  }, [details.state]);

  if (details.state === 'LOADING') return <Text>Carregando...</Text>;
  if (details.state === 'ERROR') return <></>;

  function handleReachHead() {
    delay(100).then(() => {
      goalVPRef.current?.previousPage();
    });
  }

  function handleReachTail() {
    delay(100).then(() => {
      goalVPRef.current?.nextPage();
    });
  }

  return (
    <ViewPager
      ref={stepsVPRef}
      data={steps}
      style={{ flex: 1 }}
      renderItem={step => (
        <View style={[
          styles.passo_container,
          { width, flex: 1, justifyContent: 'flex-start' },          
      ]}>
          <View style={{ padding: 10, backgroundColor: details.data?.color, borderRadius: 5, }}>
              <Text style={{ fontSize: 16, color: '#fff', fontFamily: fonts.textoResposta }}>Passo {step.id}</Text>
          </View>
          <View style={[styles.passo, { borderColor: details.data?.color }]}>
              <Text style={styles.passo_texto}>
                  {step.description}
              </Text>
              {/*step.imagem != null && (
                  <Image source={{ uri: step.imagem }} style={{ width: width * 0.5, height: width * 0.45, maxWidth: 250, maxHeight: 250 }} resizeMode='contain' />
              )*/}
          </View>
          {step.asnwers.map(answer => {
              return (
                  <View style={[styles.passo, { borderColor: details.data?.color }]}>
                      <Text style={[styles.passo_data, { color: '#505050' }]}>
                          {answer.date_label} {'\n'}
                          {/*answer.semanas*/}
                      </Text>
                      <Text style={styles.passo_texto}>
                          {answer.description}
                      </Text>
                      <Text style={[styles.autor_resposta, { color: details.data?.color }]}>
                          {/*answer.nom_usuario*/}
                      </Text>
                  </View>
              )
          })}
      </View>
      )}
      // onChange={handleOnChange}
      onReachTail={handleReachTail}
      onReachHead={handleReachHead}
      renderHead={() => <Text style={{ color: 'white', fontSize: 18 }}>voltar passo</Text>}
      renderTail={() => <Text style={{ color: 'white', fontSize: 18 }}>ir passo a frente</Text>}
    />
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  imageStyle: {
      width: width * 0.75,
      height: width * 0.75,
      resizeMode: 'contain',
      flex: 1,
  },
  textContainer: {
      alignItems: 'flex-start',
      alignSelf: 'flex-end',
      flex: 0.5,
  },
  heading: {
      color: '#444',
      textTransform: 'uppercase',
      fontSize: 24,
      fontWeight: '800',
      letterSpacing: 2,
      marginBottom: 5,
  },
  description: {
      color: '#ccc',
      fontWeight: '600',
      textAlign: 'left',
      width: width * 0.75,
      marginRight: 10,
      fontSize: 16,
      lineHeight: 16 * 1.5,
  },
  logo: {
      width: width * 0.2,
      height: width * 0.2,
      marginBottom: 25
  },
  
  dados: {
      width: width * 0.9,
      backgroundColor: '#96989A',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1
  },
  texto_dados: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
      fontFamily: fonts.passo,
      lineHeight: 24
  },
  educadora: {
      marginLeft: 30
  },
  imagem_dados: {
      width: width * 0.4,
      height: width * 0.4
  },
  button_titulo: {
      backgroundColor: '#505050',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 15,
      width: width * 0.42,
      marginTop: 25,
      flexDirection: 'row'
  },
  texto_titulo: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      width: width * 0.20
  },
  imagem_titulo: {
      width: width * 0.09
  },
  passo_container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
  },
  passo: {
      flex: 1,
      minHeight: 200,
      width: width * 0.9,
      borderWidth: 2,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      marginTop: -5
  },
  passo_texto: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: fonts.textoResposta
  },
  passo_data: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: fonts.textoResposta
  },
  pageContainer: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
  },
  page: {
      width: width * 0.8,
      height: height * 0.6,
      backgroundColor: '#ff0000',
      justifyContent: 'center',
      alignItems: 'center',
      backfaceVisibility: 'hidden',
  },
  text: {
      fontSize: 24,
      fontWeight: 'bold',
  },
  objetivos: {
      fontSize: 17,
      fontWeight: '800',
      color: '#505050'
  },
  autor_resposta: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: fonts.textoResposta,
      marginTop: 20
  }
});