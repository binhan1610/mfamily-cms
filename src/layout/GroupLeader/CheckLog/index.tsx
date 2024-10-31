import Button from '@components/Button';
import ActionHead from '@layout/components/ActionHead';
import SearchTable from '@layout/components/SearchTable';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputForward from '@components/Input';
import RCDatePicker from '@components/DatePicker';
import { ROUTE_PATH } from '@utils/common';
import { checkPhoneInLog } from '../service';
import { toast } from 'react-toastify';
function CheckLog() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(String());
  const [keyword, setKeyword] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [require, setRequire] = useState<boolean>(false);
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    setRequire(false);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      const isoDateString = date.toISOString();
      setStartDate(isoDateString);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      const isoDateString = date.toISOString();
      setEndDate(isoDateString);
    }
  };
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
  };

  //view detail info member
  const handerClickHistoryLogin = () => {
    if (!startDate && !endDate) {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    } else {
      if (!phone) {
        setRequire(true);
      } else {
        const phoneSearch = checkPhoneInLog(phone);
        if (phoneSearch) {
          router.push({
            pathname: ROUTE_PATH.LOG_LOGIN,
            query: {
              phone_parent: phoneSearch,
              ...(keyword && { keyword: keyword }),
              ...(startDate && { startDate: startDate }),
              ...(endDate && { endDate: endDate }),
            },
          });
        }
      }
    }
  };

  const handerClickHistoryConnection = () => {
    if (!startDate && !endDate) {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    } else {
      if (!phone) {
        setRequire(true);
      } else {
        const phoneSearch = checkPhoneInLog(phone);
        if (phoneSearch) {
          router.push({
            pathname: ROUTE_PATH.LOG_CONNECTION,
            query: {
              phone_parent: phoneSearch,
              ...(keyword && { keyword: keyword }),
              ...(startDate && { startDate: startDate }),
              ...(endDate && { endDate: endDate }),
            },
          });
        }
      }
    }
  };

  const handerClickHistoryNotification = () => {
    if (!startDate && !endDate) {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    } else {
      if (!phone) {
        setRequire(true);
      } else {
        const phoneSearch = checkPhoneInLog(phone);
        if (phoneSearch) {
          router.push({
            pathname: ROUTE_PATH.NOTIFICATION,
            query: {
              phone_parent: phoneSearch,
              ...(keyword && { keyword: keyword }),
              ...(startDate && { startDate: startDate }),
              ...(endDate && { endDate: endDate }),
            },
          });
        }
      }
    }
  };

  const handerClickHistoryLocation = () => {
    if (!startDate && !endDate) {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    } else {
      if (!phone) {
        setRequire(true);
      } else {
        const phoneSearch = checkPhoneInLog(phone);
        if (phoneSearch) {
          router.push({
            pathname: ROUTE_PATH.LOCATION,
            query: {
              phone_parent: phoneSearch,
              ...(keyword && { keyword: keyword }),
              ...(startDate && { startDate: startDate }),
              ...(endDate && { endDate: endDate }),
            },
          });
        }
      }
    }
  };

  const handerClickHistorySafezoneSetting = () => {
    if (!startDate && !endDate) {
      toast.error('Vui lòng lựa chọn khoảng thời gian');
    } else {
      if (!phone) {
        setRequire(true);
      } else {
        const phoneSearch = checkPhoneInLog(phone);
        if (phoneSearch) {
          router.push({
            pathname: ROUTE_PATH.SAFEZONE_SETTING,
            query: {
              phone_parent: phoneSearch,
              ...(keyword && { keyword: keyword }),
              ...(startDate && { startDate: startDate }),
              ...(endDate && { endDate: endDate }),
            },
          });
        }
      }
    }
  };
  return (
    <>
      <ActionHead title='Kiểm tra logs'></ActionHead>
      <SearchTable logTable>
        <div style={{ display: 'block' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RCDatePicker
              width='130px'
              margin='0px 40px 0px 70px'
              label='Khoảng thời gian:'
              onChange={handleStartDateChange}
              value={startDate}
              value2={endDate}
              placeholder='Ngày bắt đầu'
              placeholder2='Ngày kết thúc'
              onChange2={handleEndDateChange}
              isRequired
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              margin: '30px 0px',
            }}
          >
            <InputForward
              label='Số điện thoại trưởng nhóm:'
              placeholder='Nhập SĐT trưởng nhóm'
              type='text'
              isRequired
              onChange={handleChangePhone}
            />
            {require && (
              <div style={{ marginLeft: '10px', color: 'red' }}>
                Vui lòng nhập số điện thoại trưởng nhóm
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginBottom: '50px',
            }}
          >
            <InputForward
              label='Tên thành viên được kết nối:'
              placeholder='Nhập tên thành viên'
              type='text'
              onChange={handleChangeKeyword}
            />
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Button
              text='Lịch sử đăng nhập'
              handleSubmit={handerClickHistoryLogin}
              bgColor='#FFFFFF'
              color='black'
            />
            <Button
              text='Lịch sử kết nối'
              handleSubmit={handerClickHistoryConnection}
              bgColor='#FFFFFF'
              color='black'
            />
            <Button
              text='Lịch sử thông báo'
              handleSubmit={handerClickHistoryNotification}
              bgColor='#FFFFFF'
              color='black'
            />
            <Button
              text='Lịch sử vị trí'
              handleSubmit={handerClickHistoryLocation}
              bgColor='#FFFFFF'
              color='black'
            />
            <Button
              text='DS Vùng an toàn'
              handleSubmit={handerClickHistorySafezoneSetting}
              bgColor='#FFFFFF'
              color='black'
            />
          </div>
        </div>
      </SearchTable>
    </>
  );
}

export default CheckLog;
