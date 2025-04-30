import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements';

export default function StackAppbar(props: NativeStackHeaderProps) {
    const title = getHeaderTitle(props.options, props.route.name);

    return (
        <Appbar.Header>
            {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}   