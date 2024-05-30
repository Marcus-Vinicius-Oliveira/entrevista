import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import '../styles/styles.css';
import JSZipUtils from 'jszip-utils';

const InterviewForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        sex: '',
        jobTitle: '',
        jobDescription: '',
        workDays: [],
        startTime: '',
        endTime: '',
        breakTime: '',
        mealHours: '',
        workCardSigned: '',
        signatureCorrect: '',
        realStartDate: '',
        realEndDate: '',
        startDate: '',
        endDate: '',
        contractTermination: '',
        terminationReason: '',
        documentSigned: '',
        documentsSigned: [],
        otherDocument: '',
        fgts: '',
        vacation: '',
        vacationPeriods: '',
        receivedValue: '',
        receivedDate: '',
        receivedAmount: '',
        reasonForLeaving: '',
        remarks: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData({ ...formData, [name]: [...formData[name], value] });
            } else {
                setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loadFile(
            `${process.env.PUBLIC_URL}/template.docx`,
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render(formData);

                const out = doc.getZip().generate({
                    type: 'blob',
                    mimeType:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });

                saveAs(out, 'Ficha_de_Entrevista.docx');
            }
        );
    };

    const loadFile = (url, callback) => {
        JSZipUtils.getBinaryContent(url, callback);
    };

    return (
        <div className="container">
            <h1>Ficha de Entrevista para Processo Trabalhista</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Nome Completo:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Endereço:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Sexo:</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="sex" value="Masculino" onChange={handleChange} required /> Masculino</label>
                        <label><input type="radio" name="sex" value="Feminino" onChange={handleChange} required /> Feminino</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="jobTitle">Cargo Anterior:</label>
                    <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="jobDescription">Descrição do Cargo:</label>
                    <textarea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label>Dias da Semana em que Trabalhava:</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="workDays" value="Segunda-feira" onChange={handleChange} /> Segunda-feira</label>
                        <label><input type="checkbox" name="workDays" value="Terça-feira" onChange={handleChange} /> Terça-feira</label>
                        <label><input type="checkbox" name="workDays" value="Quarta-feira" onChange={handleChange} /> Quarta-feira</label>
                        <label><input type="checkbox" name="workDays" value="Quinta-feira" onChange={handleChange} /> Quinta-feira</label>
                        <label><input type="checkbox" name="workDays" value="Sexta-feira" onChange={handleChange} /> Sexta-feira</label>
                        <label><input type="checkbox" name="workDays" value="Sábado" onChange={handleChange} /> Sábado</label>
                        <label><input type="checkbox" name="workDays" value="Domingo" onChange={handleChange} /> Domingo</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Hora de Início do Trabalho:</label>
                    <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">Hora em que Realmente Terminava o Trabalho:</label>
                    <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Tirava Horário para Refeição e Descanso?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="breakTime" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="breakTime" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                {formData.breakTime === 'Não' && (
                    <div className="form-group">
                        <label htmlFor="mealHours">Quantas Horas para Refeição:</label>
                        <input type="text" id="mealHours" name="mealHours" value={formData.mealHours} onChange={handleChange} />
                    </div>
                )}
                <div className="form-group">
                    <label>Carteira de Trabalho Assinada?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="workCardSigned" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="workCardSigned" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                {formData.workCardSigned === 'Sim' && (
                    <div className="form-group">
                        <label>Data de Assinatura Está Correta?</label>
                        <div className="checkbox-group">
                            <label><input type="radio" name="signatureCorrect" value="Sim" onChange={handleChange} /> Sim</label>
                            <label><input type="radio" name="signatureCorrect" value="Não" onChange={handleChange} /> Não</label>
                        </div>
                    </div>
                )}
                {formData.signatureCorrect === 'Não' ? (
                    <div className="form-group">
                        <label htmlFor="realStartDate">Qual a Real Data de Entrada?</label>
                        <input type="date" id="realStartDate" name="realStartDate" value={formData.realStartDate} onChange={handleChange} />
                        <label htmlFor="realEndDate">Qual a Real Data de Saída (caso tenha saído)?</label>
                        <input type="date" id="realEndDate" name="realEndDate" value={formData.realEndDate} onChange={handleChange} />
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="startDate">Data de Entrada:</label>
                            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Data de Saída:</label>
                            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Ocorreu o término do contrato?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="contractTermination" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="contractTermination" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                {formData.contractTermination === 'Sim' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="terminationReason">Qual motivo?</label>
                            <select id="terminationReason" name="terminationReason" value={formData.terminationReason} onChange={handleChange}>
                                <option value="Demissão sem motivo">Demissão sem motivo</option>
                                <option value="Demissão com motivo">Demissão com motivo</option>
                                <option value="Eu pedi para sair">Eu pedi para sair</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Assinou algum documento?</label>
                            <div className="checkbox-group">
                                <label><input type="radio" name="documentSigned" value="Sim" onChange={handleChange} /> Sim</label>
                                <label><input type="radio" name="documentSigned" value="Não" onChange={handleChange} /> Não</label>
                            </div>
                        </div>
                        {formData.documentSigned === 'Sim' && (
                            <div className="form-group">
                                <label>Qual documento pode ter assinado?</label>
                                <div className="checkbox-group">
                                    <label><input type="checkbox" name="documentsSigned" value="Comunicado de dispensa" onChange={handleChange} /> Comunicado de dispensa</label>
                                    <label><input type="checkbox" name="documentsSigned" value="Carta pedindo demissão" onChange={handleChange} /> Carta pedindo demissão</label>
                                    <label><input type="checkbox" name="documentsSigned" value="Termo de Rescisão" onChange={handleChange} /> Termo de Rescisão</label>
                                    <label><input type="checkbox" name="documentsSigned" value="Recibo de quitação das verbas" onChange={handleChange} /> Recibo de quitação das verbas</label>
                                    <label><input type="checkbox" name="documentsSigned" value="Outros" onChange={handleChange} /> Outros</label>
                                </div>
                            </div>
                        )}
                        {formData.documentsSigned.includes('Outros') && (
                            <div className="form-group">
                                <label htmlFor="otherDocument">Qual outro documento pode ter assinado?</label>
                                <input type="text" id="otherDocument" name="otherDocument" value={formData.otherDocument} onChange={handleChange} />
                            </div>
                        )}
                    </>
                )}
                <div className="form-group">
                    <label>O FGTS está sendo recolhido corretamente?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="fgts" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="fgts" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Férias Vencidas?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="vacation" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="vacation" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                {formData.vacation === 'Sim' && (
                    <div className="form-group">
                        <label htmlFor="vacationPeriods">Períodos de Férias Vencidas:</label>
                        <input type="text" id="vacationPeriods" name="vacationPeriods" value={formData.vacationPeriods} onChange={handleChange} />
                    </div>
                )}
                <div className="form-group">
                    <label>Recebeu algum valor quando saiu?</label>
                    <div className="checkbox-group">
                        <label><input type="radio" name="receivedValue" value="Sim" onChange={handleChange} required /> Sim</label>
                        <label><input type="radio" name="receivedValue" value="Não" onChange={handleChange} required /> Não</label>
                    </div>
                </div>
                {formData.receivedValue === 'Sim' && (
                    <div className="form-group">
                        <label htmlFor="receivedDate">Quando recebeu?</label>
                        <input type="date" id="receivedDate" name="receivedDate" value={formData.receivedDate} onChange={handleChange} />
                        <label htmlFor="receivedAmount">Quanto recebeu quando saiu?</label>
                        <input type="text" id="receivedAmount" name="receivedAmount" value={formData.receivedAmount} onChange={handleChange} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="reasonForLeaving">Motivo da Saída:</label>
                    <textarea id="reasonForLeaving" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="remarks">Observações:</label>
                    <textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} rows="4"></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default InterviewForm;
