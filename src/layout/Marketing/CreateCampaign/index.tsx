import React, { useEffect, useState } from 'react';
import ActionHead from '@layout/components/ActionHead';
import Form, { Field } from 'rc-field-form';
import styles from './index.module.scss';
import Button from '@components/Button';
import RadioForward from '@components/Radio';
import FormItem from '@components/FormItem';
import InputForward from '@components/Input';
import { ROUTE_PATH, TYPE } from '@utils/common';
import { useRouter } from 'next/router';
import RCDatePicker from '@components/DatePicker';
import Select from '@components/Select';
import TextareaForward from '@components/InputTextarea';
import InputFile from '@components/InputFile';
import { useAddMarketing, useExportFileExample, useGetMyProfile } from '../service';
import { toast } from 'react-toastify';

const radioOptions = [
  { label: 'Tất cả', value: 'Tất cả' },
  { label: 'Trưởng nhóm', value: 'Trưởng nhóm' },
  { label: 'Thành viên thiết bị', value: 'Thành viên thiết bị' },
  {
    label: 'Thành viên chia sẻ gói cước và kết nối thiết bị',
    value: 'Thành viên chia sẻ gói cước và kết nối thiết bị',
  },
];
const typeGroup = [
  {
    id: 'mFamily',
    name: 'mFamily',
  },
];
const statusPackage = [
  {
    id: 'Open',
    name: 'Open',
  },
  {
    id: 'Close',
    name: 'Close',
  },
];
const typePlan = [
  {
    id: 'Theo ngày',
    name: 'Theo ngày',
  },
  {
    id: 'Lặp lại theo ngày',
    name: 'Lặp lại theo ngày',
  },
  {
    id: 'Theo tháng',
    name: 'Theo tháng',
  },
];

const AddCampaign = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [typeRole, setTypeRole] = useState<string | null>();
  const [startDate, setStartDate] = useState<string>();
  const [timeDoing, setTimeDoing] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [plan, setPlan] = useState('Theo ngày');
  const [file, setFile] = useState<File | null>(null);
  const [check, setCheck] = useState(true);
  const onFinish = (value: any) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name_campaign', value.name_campaign);
      if (startDate) {
        formData.append('start_date', startDate);
      } else toast.error('vui lòng nhập ngày bắt đầu chiến dịch');
      if (endDate) {
        formData.append('end_date', endDate);
      } else toast.error('vui lòng nhập ngày kết thúc chiến dịch');
      formData.append('objective', value.objective);
      formData.append('type_plan', plan);
      if (timeDoing) {
        formData.append('execution_hour', timeDoing);
      } else toast.error('vui lòng nhập ngày thực hiện chiến dịch');
      formData.append('title_noti', value.title_noti);
      userAddMarketing.run(formData);
    } else {
      const payload = {
        name_campaign: value.name_campaign,
        objective: value.objective,
        start_date: startDate,
        end_date: endDate,
        object: typeRole,
        criteria_member: value.criteria_number,
        type_plan: plan,
        execution_hour: timeDoing,
        title_noti: value.title_noti,
      };
      userAddMarketing.run(payload);
    }
  };

  const handleSelectChange = (event: any) => {
    setPlan(event?.target?.value);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date?.toISOString());
  };

  const handleTimeDoingChange = (date: Date | undefined) => {
    setTimeDoing(date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date?.toISOString());
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleChangeRole = (value: string) => {
    setTypeRole((prevValue) => {
      const newValue = prevValue === value ? null : value;
      form.setFieldValue('role', newValue);
      return newValue;
    });
  };

  const handleCancelForm = () => {
    router.push(ROUTE_PATH.LIST_MARKETING);
    form.resetFields();
  };

  const handleExportExample = () => {
    getExampleFile.run();
  };
  // api
  const getExampleFile = useExportFileExample({
    onSuccess: (buffer) => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      a.download = `file-mẫu.xlsx`;
      document.body.appendChild(a);
      a.click();
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const getMyProfile = useGetMyProfile({
    onSuccess: (resp) => {
      if (resp.data) {
        const permissions = resp.data.role.permissions;
        const checkRole = permissions.some((p: any) =>
          p.apis.includes('View_Edit_Marketing_Campaign'),
        );
        if (checkRole) {
          setCheck(true);
        } else setCheck(false);
        // )
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });

  const userAddMarketing = useAddMarketing({
    onSuccess: (resp) => {
      if (resp.data) {
        toast.success('bạn đã thêm chiến dịch mới thành công');
        router.push(ROUTE_PATH.LIST_MARKETING);
      }
    },
    onError: (e) => {
      toast.error(e.message);
      console.log('error');
    },
  });
  ///item option//
  const itemOptions = [
    {
      label: 'Tên chiến dịch',
      name: 'name_campaign',
      required: true,
      type: TYPE.TEXT,
      disabled: false,
    },
    {
      label: 'Mục tiêu',
      name: 'objective',
      type: TYPE.TEXT,
      disabled: false,
      required: false,
    },
    {
      label: 'Thời gian thực hiện',
      name: 'time',
      required: false,
      type: TYPE.TEXT,
      render: (
        <RCDatePicker
          width='140px'
          margin='0px 40px 0px 60px'
          label='Thời gian thực hiện:'
          onChange={handleStartDateChange}
          value={startDate}
          value2={endDate}
          placeholder='Ngày bắt đầu'
          placeholder2='Ngày kết thúc'
          onChange2={handleEndDateChange}
        />
      ),
    },
    {
      label: 'Đối tượng',
      name: 'object',
      required: false,
      type: TYPE.TEXT,
      render: (
        <div className={styles.formRadio}>
          <label className={styles.label}>Đối tượng :</label>
          <Field name='role'>
            {
              <div className={styles.radioGroup}>
                {radioOptions.map((option) => (
                  <RadioForward
                    key={option.value}
                    label={option.label}
                    option={option}
                    value={typeRole}
                    onChange={() => handleChangeRole(option.value)}
                  />
                ))}
              </div>
            }
          </Field>
        </div>
      ),
    },
    {
      label: 'Tải danh sách riêng',
      name: 'list_member',
      required: false,
      description: 'Không có danh sách được chọn',
      render: (
        <InputFile
          label='Tải danh sách riêng'
          layout='Tiêu chí'
          description='Không có danh sách được chọn'
          onChange={handleFileChange}
          fileName={file?.name}
          onClick={handleExportExample}
        />
      ),
    },
    {
      label: 'Loại nhóm',
      name: 'type_group',
      required: false,
      type: TYPE.TEXT,
      render: (
        <Select data={typeGroup} label='Loại nhóm' title='groupType' value='' disabled={true} />
      ),
    },
    {
      label: 'Gói cước',
      name: 'package',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(ID1, ID2, ID3)',
    },
    {
      label: 'Tình trạng gói',
      name: 'status_package',
      required: false,
      type: TYPE.TEXT,
      render: (
        <Select
          data={statusPackage}
          label='Tình trạng gói'
          title='status_package'
          value=''
          disabled={true}
        />
      ),
    },
    {
      label: 'Số thành viên',
      name: 'criteria_number',
      required: false,
      type: TYPE.TEXT,
      description: '(Số lượng:<1, >5)',
    },
    {
      label: 'Đã gọi nội mạng',
      name: 'on_net_call',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(Phần trăm sử dụng: <20, >50)',
    },
    {
      label: 'Đã gọi ngoại mạng',
      name: 'out_net_call',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(Phần trăm sử dụng: <20, >50)',
    },
    {
      label: 'Đã sử dụng data',
      name: 'used_data',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(Phần trăm sử dụng: <20, >50)',
    },
    {
      label: 'Thời gian đăng ký gói',
      name: 'time_register_package',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(ngày)',
    },
    {
      label: 'Thời gian bị block',
      name: 'time_block',
      required: false,
      type: TYPE.TEXT,
      disabled: true,
      description: '(ngày)',
    },
    {
      label: 'Loại kế hoạch',
      name: 'type_plan',
      required: false,
      type: TYPE.TEXT,
      render: (
        <Select
          data={typePlan}
          label='Loại kế hoạch'
          title='type_plan'
          onChange={handleSelectChange}
          value={plan}
          disabled={false}
          isRequired
        />
      ),
    },
    {
      label: 'Giờ thực hiện',
      name: 'execution_hour',
      required: false,
      type: TYPE.DATE,
      render: (
        <RCDatePicker
          width='140px'
          margin='0px 40px 0px 60px'
          label='Giờ thực hiện'
          onChange={handleTimeDoingChange}
          value={timeDoing}
          placeholder='Giờ thực hiện'
        />
      ),
    },
    {
      label: 'Nội dung thông báo',
      name: 'title_noti',
      required: false,
      type: TYPE.TEXT,
      render: (
        <TextareaForward placeholder='Nội dung thông báo' label='Nội dung thông báo:' isRequired />
      ),
    },
  ];
  ////effect////
  useEffect(() => {
    getMyProfile.run();
  }, []);
  return (
    <>
      <ActionHead title='Tạo mới chiến dịch' />
      {check ? (
        <Form form={form} onFinish={onFinish} className={styles.form}>
          <div className={styles.fromGroup}>
            {itemOptions.map((item) => (
              <FormItem
                name={item.name}
                className={styles.formItem}
                rules={[
                  {
                    required: item.required,
                    message: 'Vui lòng nhập',
                  },
                ]}
                key={item.name}
              >
                {item.render ? (
                  item.render
                ) : (
                  <InputForward
                    description={item.description}
                    label={item.label}
                    placeholder={item.label}
                    type='text'
                    isRequired={item.required}
                    disabled={item.disabled}
                  />
                )}
              </FormItem>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <Button text='Lưu' type='submit' isLoading={userAddMarketing.loading} />
            <Button text='Huỷ' isCancel handleSubmit={handleCancelForm} />
          </div>
        </Form>
      ) : (
        <div style={{ textAlign: 'center' }}>Không có quyền truy cập</div>
      )}
    </>
  );
};

export default AddCampaign;
