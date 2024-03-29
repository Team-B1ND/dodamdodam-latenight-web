import {
  LateNightAllow,
  LateNightContainer,
  LateNightDate,
  LateNightDelBtn,
  LateNightInfoBox,
  LateNightItemBox,
  LateNightName,
  LateNightProfile,
  LateNightUserGrade,
  LateNightUserInfoBox,
} from "./style";
import DefaultProfileImage from "../../../assets/common/defaultProfile.png";
import useDeleteLateNight from "../../../hooks/LateNight/useDeleteLateNight";
import { useGetMyLateNightsQuery } from "../../../queries/LateNight/latenight.query";

const MyLateNightItem = () => {
  const { data } = useGetMyLateNightsQuery({ suspense: true });
  const { onDeletePost } = useDeleteLateNight();
  return (
    <LateNightContainer>
      {data?.data.map((data) => {
        const startAt = data.startAt.substring(0, 10);
        const endAt = data.endAt.substring(0, 10);
        return (
          <>
            <LateNightItemBox key={data.id}>
              <LateNightProfile src={DefaultProfileImage} />
              <LateNightInfoBox>
                <LateNightUserInfoBox>
                  <LateNightName>{data.student.name}</LateNightName>
                  <LateNightUserGrade>{`${data.student.grade}학년 ${data.student.room}반 ${data.student.number}번`}</LateNightUserGrade>
                </LateNightUserInfoBox>
                <LateNightDate>{`${startAt} ~ ${endAt}`}</LateNightDate>
              </LateNightInfoBox>
              <LateNightAllow
                status={
                  data.status === "ALLOWED"
                    ? "ALLOWED"
                    : data.status === "DENIED"
                    ? "DENIED"
                    : "PENDING"
                }
              >
                {data.status === "ALLOWED"
                  ? "승인 완료"
                  : data.status === "DENIED"
                  ? "승인 거절"
                  : "승인대기"}
              </LateNightAllow>
              <LateNightDelBtn onClick={() => onDeletePost({ id: data.id })}>
                X
              </LateNightDelBtn>
            </LateNightItemBox>
          </>
        );
      })}
    </LateNightContainer>
  );
};

export default MyLateNightItem;
