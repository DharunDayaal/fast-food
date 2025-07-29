import React from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";

interface RatingComponentProps {
    rating: number;
    maxRating?: number;
}

const Rating = ({ rating, maxRating = 5 }: RatingComponentProps) => {
    return (
        <View className="flex-row gap-x-1 mt-2">
            <StarRating
                rating={Math.round(rating)}
                maxStars={maxRating}
                onChange={() => {}}
                starSize={16}
                color={"#FE8C00"}
                enableHalfStar
                starStyle={{
                    marginHorizontal: 2,
                }}
            />
            <Text className="paragraph-medium text-neutral-400">{rating} / {maxRating}</Text>
        </View>
    );
};

export default Rating;
