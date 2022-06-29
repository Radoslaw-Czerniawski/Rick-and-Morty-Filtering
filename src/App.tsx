import { useState } from 'react';

import * as S from './StylesApp';
import './App.css';
import { Episode } from './Components/Episode/Episode';
import { Pagination } from './Components/Pagination/Pagination';

import vector from './assets/Vector.svg';

import { Origin } from './Components/Origin/Origin';
import { StatusIcon } from './Components/StatusIcon/StatusIcon';
import { Header } from './Components/Header/Header';
import { useCharacters } from './Hooks/useCharacters';
import { CharacterCheckbox } from './Components/CharacterCheckbox/CharacterCheckbox';

export const App = () => {
    const [pageNumber, setPageNumber] = useState(0);

    const { characters, info, filtersApi } = useCharacters(pageNumber);

    return (
        <S.AppWrapper>
            <Header filtersApi={filtersApi} />

            <S.Table>
                <S.Head>
                    <S.HeadRow>
                        <S.HeadData>
                            <S.Input
                                type="checkbox"
                                // onChange={handleCheckboxChange}
                            />
                            <S.HeadNameWrapper>
                                <S.SpanName>Name</S.SpanName>
                                <S.ArrowWrapper>
                                    <S.TopArrow src={vector} alt="arrow" />
                                    <S.BottomArrow src={vector} alt="arrow" />
                                </S.ArrowWrapper>
                            </S.HeadNameWrapper>
                        </S.HeadData>

                        <S.HeadData>
                            <S.SpanTitle>Avatar</S.SpanTitle>
                            <S.ArrowWrapper>
                                <S.TopArrow src={vector} alt="arrow" />
                                <S.BottomArrow src={vector} alt="arrow" />
                            </S.ArrowWrapper>
                        </S.HeadData>
                        <S.HeadData>
                            <S.SpanTitle>Origin</S.SpanTitle>
                            <S.ArrowWrapper>
                                <S.TopArrow src={vector} alt="arrow" />
                                <S.BottomArrow src={vector} alt="arrow" />
                            </S.ArrowWrapper>
                        </S.HeadData>
                        <S.HeadData>
                            <S.SpanTitle>Episodes</S.SpanTitle>
                            <S.ArrowWrapper>
                                <S.TopArrow src={vector} alt="arrow" />
                                <S.BottomArrow src={vector} alt="arrow" />
                            </S.ArrowWrapper>
                        </S.HeadData>
                        <S.HeadData>
                            <S.SpanTitle>Status</S.SpanTitle>
                            <S.ArrowWrapper>
                                <S.TopArrow src={vector} alt="arrow" />
                                <S.BottomArrow src={vector} alt="arrow" />
                            </S.ArrowWrapper>
                        </S.HeadData>
                    </S.HeadRow>
                </S.Head>
                <tbody>
                    {characters?.map((el) => {
                        return (
                            <S.BodyRow status={el.status} key={el.id}>
                                <S.BodyData>
                                    <CharacterCheckbox characterId={el.id} />
                                    <S.BodyNameWrapper>
                                        <S.SpanBodyName status={el.status}>
                                            {el.name}
                                        </S.SpanBodyName>
                                        <S.SpanSpecies status={el.status}>
                                            {el.species}
                                        </S.SpanSpecies>
                                    </S.BodyNameWrapper>
                                </S.BodyData>
                                <S.BodyData>
                                    <S.Avatar
                                        src={el.image}
                                        alt={'Avatar of ' + el.name}
                                        width={50}
                                    />
                                </S.BodyData>
                                <S.BodyData>
                                    <Origin
                                        originUrl={el.origin.url}
                                        originName={el.origin.name}
                                    />
                                </S.BodyData>
                                <S.BodyData>
                                    <S.EpisodeWrapper>
                                        {el.episodes.map((episode) => (
                                            <Episode
                                                status={el.status}
                                                key={episode}
                                                episodeUrl={episode}
                                            />
                                        ))}
                                    </S.EpisodeWrapper>
                                </S.BodyData>
                                <S.BodyData>
                                    <S.StatusWrapper>
                                        <StatusIcon status={el.status} />
                                        <S.SpanStatus status={el.status}>
                                            {el.status}
                                        </S.SpanStatus>
                                    </S.StatusWrapper>
                                </S.BodyData>
                            </S.BodyRow>
                        );
                    })}
                </tbody>
            </S.Table>

            {info && (
                <Pagination
                    setPageNumber={setPageNumber}
                    pageNumber={pageNumber}
                    info={info}
                />
            )}
        </S.AppWrapper>
    );
};
