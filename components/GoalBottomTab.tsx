import { useEffect, useMemo, useState } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGoal } from "@/contexts/goal-context";
import { Goal, GoalTitle } from "@/entities/goal";
import { asyncArrayToState } from "@/utils/use-async";
import { router } from "expo-router";
import homeImage from "../assets/images/home.png"
import menuImage from "../assets/images/menu.png"
import { DI } from "@/controllers/DI";
import { SideBarMenu } from "./SideBarMenu";
import { useAppUser } from "@/contexts/UserContext";
const { width, height } = Dimensions.get('screen');

export type GroupedGoal = {
  id: number;
  color: string;
}

function groupGoalsByColor(goals: Goal[]): GroupedGoal[] {
  const set = new Set<string>();

  goals.forEach(goal => set.add(goal.color));

  return [...set].map((color, id) => ({ id, color }));
}

type Props = {
  onGotoPage?(goal: GroupedGoal): void;
}

export function GoalBottomTab({ onGotoPage }: Props) {
  const { goalVPRef, goals } = useGoal();
  const [titles, setTitles] = useState<GoalTitle[]>()
  const goalsState = asyncArrayToState(goals);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { userToken, setUserToken } = useAppUser(); 

  const closeModal = () => setModalVisible(false);

  const groupedGoals = useMemo((): GroupedGoal[] => {
    return groupGoalsByColor(goalsState)
  }, [goalsState]);

  function handleGotoPage(goal: GroupedGoal) {
    if (onGotoPage) {
      onGotoPage(goal);
    } else {
      goalVPRef.current?.gotoPageWhere(g => g.color === goal.color);
    }
  }

  const fetchKidInformation = async () => {
    try {
      const title = await DI.titles.GetTitles();
      setTitles(title)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKidInformation();
  }, []);


  return (
    <>

      <SideBarMenu visible={modalVisible} onClose={closeModal} />

      <View style={footerStyles.container} >
        <TouchableOpacity onPress={() => { router.replace('/(home)') }} >
          <Image source={homeImage} style={footerStyles.icones} resizeMode='contain' />
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          {titles &&
            titles
              .filter(x => x.menu == 1)
              .map((item, index) => {
                if (item.imagem_app != null && item.imagem_app != '') {
                  return (
                    <TouchableOpacity key={index.toString()} onPress={() => { handleGotoPage(groupedGoals[index]) }} style={{ marginLeft: 2 }}>
                      <Image source={{ uri: item.imagem_app }} style={footerStyles.icones} resizeMode='contain' />
                    </TouchableOpacity>
                  )
                }
              })
          }
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <Image source={menuImage} style={footerStyles.icones} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    </>
  )

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        padding: 24,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#ccc",
          height: 64,
          width: 64,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => router.replace('/')}
      >
      </TouchableOpacity>
      {groupedGoals.map(goal => (
        <TouchableOpacity
          key={goal.id}
          style={{
            backgroundColor: goal.color,
            height: 64,
            width: 64,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => handleGotoPage(goal)}
        >
        </TouchableOpacity>
      ))}
    </View>
  )
}

const footerStyles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    shadowColor: '#000',
    elevation: 40,
    borderTopColor: '#505050',
    borderWidth: 0,
    paddingHorizontal: 18,
    paddingVertical: 5
  },
  icones: {
    width: width * 0.136,
    height: width * 0.136
  }
});