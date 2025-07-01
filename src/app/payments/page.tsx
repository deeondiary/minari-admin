'use client';
import PageLayout from '@/components/PageLayout';
import TextInput from '@/components/TextInput';
import React, {useState} from 'react';
import InputForm from '@/app/payments/_components/InputForm';
import SelectOption, {OptionType} from '@/components/SelectOption';
import {MANAGER_OPTIONS, REASON_OPTIONS} from '@/components/constants/options';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import {useModalStore} from '@/stores/modalStore';
import CheckModal from '@/app/payments/_components/CheckModal';
import {postPayment} from '@/apis/payment';

export interface RewardFormType {
  uuid: string;
  seed: number;
  manager: string;
  reason: string;
  memo?: string;
}

const PaymentsPage = () => {
  const {open, close} = useModalStore();
  const [rewardForm, setRewardForm] = useState<RewardFormType>({
    uuid: '',
    seed: 0,
    manager: '',
    reason: '',
    memo: '',
  });
  const updateRewardForm = (e: string | number, key: string) => {
    setRewardForm({...rewardForm, [key]: e});
  };

  // 옵션 선택 상태값 관리
  const [selectedManager, setSelectedManager] = useState<OptionType>({id: '', option: ''});
  const [selectedReason, setSelectedReason] = useState<OptionType>({id: '', option: ''});
  const onClickManagerOption = (selected: OptionType) => {
    setSelectedManager(selected);
    updateRewardForm(selected.option, 'manager');
  };
  const onClickReasonOption = (selected: OptionType) => {
    setSelectedReason(selected);
    updateRewardForm(selected.option, 'reason');
  };

  const onClickPayment = () => {
    open(
      <CheckModal
        form={rewardForm}
        onClickRightButton={onClickFetchPostPayment}
        onClickLeftButton={close}
      />,
    );
  };
  const onClickFetchPostPayment = () => {
    postPayment(rewardForm).then((response) => {
      console.log(response);
    });
  };

  const valueChecker = () => {
    const formValues = rewardForm;
    delete formValues.memo;
    return Object.values(formValues).some((value) => value === '');
  };

  return (
    <PageLayout title="리워드 지급">
      <InputForm title="uuid.">
        <TextInput value={rewardForm.uuid} setValue={(e) => updateRewardForm(e, 'uuid')} />
      </InputForm>
      <InputForm title="씨앗">
        <TextInput
          type="number"
          unit="개"
          value={typeof rewardForm.seed === 'number' ? String(rewardForm.seed) : rewardForm.seed}
          setValue={(e) => updateRewardForm(e, 'seed')}
        />
      </InputForm>
      <InputForm title="담당자">
        <SelectOption
          inputField={<SelectOption.InputField value={selectedManager.option} />}
          options={
            <SelectOption.Options
              selectedOption={selectedManager}
              handleClick={onClickManagerOption}
              options={MANAGER_OPTIONS}
            />
          }
        />
      </InputForm>
      <InputForm title="지급 사유">
        <SelectOption
          inputField={<SelectOption.InputField value={selectedReason.option} />}
          options={
            <SelectOption.Options
              selectedOption={selectedReason}
              handleClick={onClickReasonOption}
              options={REASON_OPTIONS}
            />
          }
        />
      </InputForm>
      <InputForm title="상세 메모">
        <Textarea value={rewardForm.memo} setValue={(e) => updateRewardForm(e, 'memo')} />
      </InputForm>

      <div className="mg-top-24 mg-left-100">
        <Button theme="black" onClick={onClickPayment} disabled={valueChecker()}>
          지급
        </Button>
      </div>
    </PageLayout>
  );
};

export default PaymentsPage;
