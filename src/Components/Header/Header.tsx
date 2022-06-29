import styled from 'styled-components';
import { theme } from '../../Colors';
import vector from '../../assets/Vector.svg';
import search from '../../assets/search.svg';

import {
    FiltersApi,
    SpeciesOption,
    StatusOption,
} from '../../Hooks/useCharacters';

interface Props {
    filtersApi: FiltersApi;
}

export const Header = ({ filtersApi }: Props) => {
    return (
        <StyledHeaderWrapper>
            <StyledHeader>Characters</StyledHeader>
            <StyledDropDownsWrapper>
                <StyledInputDiv>
                    <StyledInput
                        placeholder="Search"
                        onChange={(e) => filtersApi.setSearch(e.target.value)}
                    />
                </StyledInputDiv>
                <StyledSelectDiv>
                    <StyledSelect
                        defaultValue=""
                        onChange={(e) => {
                            console.log('event happened');
                            filtersApi.setSpecies(
                                e.target.value as SpeciesOption
                            );
                        }}
                    >
                        <option value="">Species</option>
                        <option value="&species=human">Human</option>
                        <option value="&species=alien">Alien</option>
                    </StyledSelect>
                    <StyledArrow src={vector} />
                </StyledSelectDiv>
                <StyledSelectDiv>
                    <StyledSelect defaultValue="">
                        <option value="">Origin</option>
                        <option value="">
                            This option will be unlocked after hiring the
                            candidate
                        </option>
                    </StyledSelect>
                    <StyledArrow src={vector} />
                </StyledSelectDiv>
                <StyledSelectDiv>
                    <StyledSelect
                        defaultValue=""
                        onChange={(e) =>
                            filtersApi.setStatus(e.target.value as StatusOption)
                        }
                    >
                        <option value="">Status</option>
                        <option value="&status=alive">Alive</option>
                        <option value="&status=dead">Dead</option>
                        <option value="&status=unknown">Unknown</option>
                    </StyledSelect>
                    <StyledArrow src={vector} />
                </StyledSelectDiv>
            </StyledDropDownsWrapper>
        </StyledHeaderWrapper>
    );
};

const StyledHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1161px;
`;

const StyledHeader = styled.header`
    font-weight: 700;
    font-size: 24px;
    display: flex;
    justify-content: flex-start;
`;

const StyledDropDownsWrapper = styled.div`
    display: flex;
    gap: 60px;
    height: 40px;
    margin-top: 24px;
`;

const StyledSelect = styled.select`
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    padding-left: 12px;
`;

const StyledSelectDiv = styled.div`
    position: relative;
    min-width: 140px;
    display: flex;
    border: 1px solid ${theme.input};
    border-radius: 5px;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    background-color: ${theme.tableBackground};
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
`;

const StyledArrow = styled.img`
    position: absolute;
    right: 12.5px;
    top: 50%;
    height: 5px;
`;

const StyledInput = styled.input`
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;

    padding-left: 12px;
`;

const StyledInputDiv = styled.div`
    position: relative;
    min-width: 140px;
    display: flex;
    border: 1px solid ${theme.input};
    border-radius: 5px;
    font-weight: 400;
    font-size: 14px;

    background-color: ${theme.tableBackground};

    &::after {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background-image: url(${search});
        background-size: cover;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    &:focus-within::after {
        display: none;
    }
`;

// const StyledSearch = styled.img`
//     position: absolute;
//     right: 10px;
//     top: 50%;
//     transform: translateY(-50%);
//     height: 20px;
// `;
